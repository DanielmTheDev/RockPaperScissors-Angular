import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import constants from '../constants';
import { FirebasePlayerService } from '../firebase/firebase-player.service';
import { Observable, of, take } from 'rxjs';
import { Player } from '../player-creation/models/player';
import { PlayerCreationService } from '../player-creation/services/player-creation.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  player = {} as Player;
  allPlayers$: Observable<Player[]> = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private playerCreationService: PlayerCreationService,
    private firebasePlayerService: FirebasePlayerService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.allPlayers$ = this.firebasePlayerService.valueChanges();
    const serializedPlayer = localStorage.getItem(constants.playerKey);
    if (serializedPlayer) {
      this.player = JSON.parse(serializedPlayer);
    } else {
      this.playerCreationService.createPlayer(this.route.snapshot.params[constants.routeParams.id])
        .pipe(take(1))
        .subscribe(createdPlayer => this.player = createdPlayer)
    }
  }

  leaveRoom(): void {
    localStorage.removeItem(constants.playerKey);
    this.router.navigate(['']).then();
  }
}
