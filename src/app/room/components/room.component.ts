import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, merge, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { CurrentPlayer } from 'src/app/store/models/current-player';
import { Player } from 'src/app/firebase/models/player';
import { LoadingStatus } from 'src/app/shared-lib/spinner/models/loadingStatus';
import { PlayerInRoom } from 'src/app/firebase/models/playerInRoom';
import { PlayerCreationService } from 'src/app/player-creation/services/player-creation.service';
import { FirebasePlayerService } from 'src/app/firebase/services/firebase-player.service';
import { FirebasePlayerInRoomService } from 'src/app/firebase/services/firebase-player-in-room.service';
import { selectPlayer } from 'src/app/store/state';
import constants from 'src/app/constants';
import { removePlayer } from 'src/app/store';

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
        map(player => merge(this.playerInRoomService.remove(player.playerInRoomId), this.firebasePlayerService.remove(player.playerId))),
        finalize(() => this.loadingStatus.isLoading = false))
      .subscribe(() => {
        this.store.dispatch(removePlayer());
        this.router.navigate(['']).then();
      });
  }
}
