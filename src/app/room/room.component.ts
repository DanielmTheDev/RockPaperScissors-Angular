import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import constants from '../constants';
import { Observable, take } from 'rxjs';
import { Player } from '../player-creation/models/player';
import { PlayerCreationService } from '../player-creation/services/player-creation.service';
import { Store } from '@ngrx/store';
import { removePlayer, selectPlayer } from '../store';
import { CurrentPlayer } from '../store/models/current-player';
import { FirebasePlayerService } from '../firebase/services/firebase-player.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  currentPlayer$: Observable<CurrentPlayer>;
  firebasePlayer$: Observable<Player | undefined> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private playerCreationService: PlayerCreationService,
    private firebasePlayerService: FirebasePlayerService,
    private route: ActivatedRoute,
    private store: Store) {
    this.currentPlayer$ = store.select(selectPlayer);
    this.firebasePlayerService.getCurrentPlayerDocument().subscribe(player => {
      this.firebasePlayer$ = player.valueChanges();
    });
  }

  ngOnInit(): void {
    this.currentPlayer$.pipe(take(1)).subscribe(player => {
      if (!player.id) {
        this.playerCreationService.createPlayer(this.route.snapshot.params[constants.routeParams.id]);
      }
    });
  }

  leaveRoom(): void {
    localStorage.removeItem(constants.playerKey);
    this.store.dispatch(removePlayer());
    this.router.navigate(['']).then();
  }
}
