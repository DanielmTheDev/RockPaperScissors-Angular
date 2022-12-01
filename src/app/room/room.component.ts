import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import constants from '../constants';
import { finalize, map, Observable, take } from 'rxjs';
import { Player } from '../firebase/models/player';
import { PlayerCreationService } from '../player-creation/services/player-creation.service';
import { Store } from '@ngrx/store';
import { removePlayer, selectPlayer } from '../store';
import { CurrentPlayer } from '../store/models/current-player';
import { FirebasePlayerService } from '../firebase/services/firebase-player.service';
import { LoadingStatus } from '../spinner/models/loadingStatus';
import { PlayerInRoom } from '../firebase/models/playerInRoom';
import { FirebasePlayerInRoomService } from '../firebase/services/firebase-player-in-room.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  currentPlayer$: Observable<CurrentPlayer>;
  firebasePlayer$: Observable<Player | undefined> | undefined;
  loadingStatus: LoadingStatus = { isLoading: false };
  firebasePlayerInRoom$: Observable<PlayerInRoom | undefined>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private playerCreationService: PlayerCreationService,
    private firebasePlayerService: FirebasePlayerService,
    private playerInRoomService: FirebasePlayerInRoomService,
    private route: ActivatedRoute,
    private store: Store) {
    this.currentPlayer$ = store.select(selectPlayer);
    this.firebasePlayerService.getCurrentPlayerDocument().subscribe(player => {
      this.firebasePlayer$ = player.valueChanges();
    });
    this.firebasePlayerInRoom$ = this.playerInRoomService.getCurrentPlayerInRoomDocument();
  }

  ngOnInit(): void {
    this.currentPlayer$.pipe(take(1)).subscribe(player => {
      if (!player.playerId) {
        this.playerCreationService.createPlayer(this.route.snapshot.params[constants.routeParams.id]);
      }
    });
  }

  leaveRoom(): void {
    this.loadingStatus.isLoading = true;
    this.currentPlayer$.pipe(take(1))
      .pipe(
        map(player => this.firebasePlayerService.remove(player.id)),
        finalize(() => this.loadingStatus.isLoading = false))
      .subscribe(
      () => {
          this.store.dispatch(removePlayer());
          this.router.navigate(['']).then();
        }
    );
  }
}
