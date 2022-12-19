import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../../firebase/models/player';
import constants from '../../constants';
import { Store } from '@ngrx/store';
import { setPlayer } from '../../store';
import { FirebasePlayerService } from '../../firebase/services/firebase-player.service';
import { PlayerCreationModalComponent } from '../components/player-creation-modal/player-creation-modal.component';

@Injectable()
export class PlayerCreationService {

  constructor(
    private dialog: MatDialog,
    private playerService: FirebasePlayerService,
    private store: Store) { }

  createPlayer(roomId: string): void {
    const dialogRef = this.dialog.open(PlayerCreationModalComponent, {
      width: constants.dialogWidth,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(name => this.persistPlayer(name, roomId));
  }

  private persistPlayer(name: string, roomId: string): void {
    const player = this.initializeBasicPlayer(name, roomId);
    this.playerService.add(player)
      .subscribe(playerId => {
        player.id = playerId;
        this.store.dispatch(setPlayer({ player: player }));
      });
  }

  private initializeBasicPlayer(name: string, roomId: string): Player {
    return {
      name: name,
      room: roomId
    } as Player;
  }
}
