import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, switchMap } from 'rxjs';
import { FirebasePlayerService } from 'src/app/firebase/firebase-player.service';
import { Player } from '../models/player';
import { PlayerCreationModalComponent } from '../player-creation-modal/player-creation-modal.component';
import constants from '../../constants';

@Injectable()
export class PlayerCreationService {

  constructor(
    private dialog: MatDialog,
    private playerService: FirebasePlayerService) { }

  createPlayer(roomId: string): Observable<Player> {
    const dialogRef = this.dialog.open(PlayerCreationModalComponent, {
      width: constants.dialogWidth,
      disableClose: true
    });
    return dialogRef.afterClosed()
      .pipe(switchMap(name => this.persistPlayer(name, roomId)));
  }

  private persistPlayer(name: string, roomId: string): Observable<Player> {
    const player = this.initializeBasicPlayer(name, roomId);
    return this.playerService.add(player)
      .pipe(map(playerId => {
        player.id = playerId;
        localStorage.setItem(constants.playerKey, JSON.stringify(player));
        return player;
      }));
  }

  private initializeBasicPlayer(name: string, roomId: string) {
    return {
      name: name,
      room: roomId
    } as Player;
  }
}
