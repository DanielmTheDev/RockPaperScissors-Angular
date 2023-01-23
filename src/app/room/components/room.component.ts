import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatestWith, concatMap, finalize, map, Observable, of, switchMap, take, zip } from 'rxjs';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
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

  private get roomId(): string {
    return this.route.snapshot.params[constants.routeParams.id];
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private playerCreationService: PlayerCreationService,
    private firebasePlayerService: FirebasePlayerService,
    private firebaseRoomService: FirebaseRoomService,
    private route: ActivatedRoute,
    private store: Store,
    private snackBar: MatSnackBar) {
    this.currentPlayer$ = store.select(selectPlayer);
    this.room$ = this.firebaseRoomService.roomValueChanges(this.roomId);
    this.firebasePlayer$ = this.firebasePlayerService.valueChanges();
  }

  ngOnInit(): void {
    this.loadingStatus.isLoading = true;
    zip([
      this.currentPlayer$,
      this.firebasePlayerService.getObserverPlayers(this.roomId),
      this.firebasePlayerService.getCurrentPlayerDocument().pipe(switchMap(doc => doc.valueChanges()))])
      .pipe(
        take(1),
        concatMap(([player, observers, currentFirebasePlayer]) => this.enterRoom(observers, player, currentFirebasePlayer)))
      .subscribe(_ => this.loadingStatus.isLoading = false);
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

  startOver(): void {
    this.firebaseRoomService.resetRoom(this.roomId).pipe(
      combineLatestWith(this.firebasePlayerService.resetAllPlayersOfTheRoom(this.roomId)))
      .subscribe(_ => this.loadingStatus.isLoading = false);

    this.loadingStatus.isLoading = true;
  }

  private enterRoom(observers: Player[], player: CurrentPlayer, currentFirebasePlayer: Player | undefined): Observable<string | boolean | undefined | void> {
    const gameAlreadyStarted = observers.length > 0;
    const doesPlayerExistInLocalStorage = player.id;
    if (gameAlreadyStarted) {
      this.showLockedRoomMessage();
      return fromPromise(this.router.navigate(['/']));
    } else if (!doesPlayerExistInLocalStorage ) {
      return this.createPlayer(this.roomId);
    } else if (!currentFirebasePlayer) {
      this.store.dispatch(removePlayer());
      return this.createPlayer(this.roomId);
    } else if (currentFirebasePlayer?.room !== this.roomId) {
      return this.resetExistingPlayer(this.roomId);
    }
    return of(undefined);
  }

  private createPlayer(roomId: string): Observable<string> {
    return this.playerCreationService.createPlayer(roomId);
  }

  private showLockedRoomMessage(): void {
    const message = 'You cannot join the current room, the game has been already started';
    const action = 'Dismiss';
    this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private resetExistingPlayer(roomId: string): Observable<void> {
    return this.firebasePlayerService.updateCurrent({
      room: roomId,
      isObserver: false,
      choice: null,
    } as Partial<Player>);
  }
}
