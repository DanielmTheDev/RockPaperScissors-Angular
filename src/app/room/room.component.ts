import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import constants from '../constants';
import { FirebasePlayerService } from '../firebase/firebase-player.service';
import { Observable, of } from 'rxjs';
import { Player } from '../player-creation/models/player';
import { PlayerCreationService } from '../player-creation/services/player-creation.service';
import { Store } from '@ngrx/store';
import { removePlayer, selectPlayer, setPlayer } from '../store';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  allPlayers$: Observable<Player[]> = of([]);
  storePlayer$: Observable<Player>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private playerCreationService: PlayerCreationService,
    private firebasePlayerService: FirebasePlayerService,
    private route: ActivatedRoute,
    private store: Store) {
      this.storePlayer$ = store.select(selectPlayer);
  }

  ngOnInit(): void {
    this.allPlayers$ = this.firebasePlayerService.valueChanges();
    const serializedPlayer = localStorage.getItem(constants.playerKey);
    if (serializedPlayer) {
      const localStoragePlayer = JSON.parse(serializedPlayer) as Player;
      this.store.dispatch(setPlayer({ player: localStoragePlayer }));
    } else {
      this.playerCreationService.createPlayer(this.route.snapshot.params[constants.routeParams.id]);
    }
  }

  leaveRoom(): void {
    localStorage.removeItem(constants.playerKey);
    this.store.dispatch(removePlayer());
    this.router.navigate(['']).then();
  }
}
