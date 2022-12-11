import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../../firebase/models/player';
import constants from '../../constants';
import { Store } from '@ngrx/store';
import { setPlayer } from '../../store';
import { FirebasePlayerService } from '../../firebase/services/firebase-player.service';
import { FirebasePlayerInRoomService } from '../../firebase/services/firebase-player-in-room.service';
import { PlayerInRoom } from '../../firebase/models/playerInRoom';
import { PlayerCreationModalComponent } from '../components/player-creation-modal/player-creation-modal.component';
import { map, Observable, switchMap } from 'rxjs';
import { AvatarGenerator } from './avatar-generator.service';

@Injectable()
export class PlayerCreationService {

  constructor(
    private dialog: MatDialog,
    private playerService: FirebasePlayerService,
    private playerInRoomService: FirebasePlayerInRoomService,
    private generator: AvatarGenerator,
    private store: Store) { }

  createPlayer(roomId: string): Observable<void> {
    const dialogRef = this.dialog.open(PlayerCreationModalComponent, {
      width: constants.dialogWidth,
      disableClose: true
    });
    return dialogRef.afterClosed().pipe(map(name => this.persistPlayer(name, roomId)));
  }

  private persistPlayer(name: string, roomId: string): void {
    this.initializeBasicPlayer(name, roomId)
      .pipe(switchMap(player => this.playerService.add(player)))
      .subscribe(playerId => {
        const playerInRoom = { playerId: playerId, roomId: roomId, isActive: true } as PlayerInRoom;
        this.playerInRoomService.add(playerInRoom)
          .subscribe(playerInRoom => this.store.dispatch(setPlayer({ playerId: playerId, playerInRoomId: playerInRoom.id })));
      });
  }

  private initializeBasicPlayer(name: string, roomId: string): Observable<Player> {
    return this.generator.provide(name)
      .pipe(map(avatar => { return { name: name, room: roomId, avatar: avatar } as Player; }));
  }
}
