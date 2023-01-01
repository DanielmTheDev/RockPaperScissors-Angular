import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { CurrentPlayer } from 'src/app/store/models/current-player';
import { Player } from 'src/app/firebase/models/player';
import { LoadingStatus } from 'src/app/shared-lib/spinner/models/loadingStatus';
import { PlayerCreationService } from 'src/app/player-creation/services/player-creation.service';
import { FirebasePlayerService } from 'src/app/firebase/services/firebase-player.service';
import { selectPlayer } from 'src/app/store/state';
import constants from 'src/app/constants';
import { removePlayer } from 'src/app/store';
import { Room } from '../../firebase/models/room';
import { FirebaseRoomService } from '../../firebase/services/firebase-room.service';
import { GameType } from '../../room-creation/models/game-type';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  currentPlayer$: Observable<CurrentPlayer>;
  firebasePlayer$: Observable<Player | undefined> | undefined;
  room$: Observable<Room | undefined>;
  loadingStatus: LoadingStatus = { isLoading: false };
  gameType = GameType;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private playerCreationService: PlayerCreationService,
    private firebasePlayerService: FirebasePlayerService,
    private firebaseRoomService: FirebaseRoomService,
    private route: ActivatedRoute,
    private store: Store) {
    this.currentPlayer$ = store.select(selectPlayer);
    this.room$ = this.firebaseRoomService.roomValueChanges(this.route.snapshot.params[constants.routeParams.id]);
    this.firebasePlayerService.getCurrentPlayerDocument().subscribe(player => {
      this.firebasePlayer$ = player.valueChanges();
    });
  }

  ngOnInit(): void {
    this.loadingStatus.isLoading = true;
    this.currentPlayer$.pipe(take(1)).subscribe(player => {
      if (!player.id) {
        this.playerCreationService.createPlayer(this.route.snapshot.params[constants.routeParams.id]).subscribe(_ => this.loadingStatus.isLoading = false);
      } else {
        this.loadingStatus.isLoading = false;
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
