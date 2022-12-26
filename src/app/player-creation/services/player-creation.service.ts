import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Player } from '../../firebase/models/player';
import constants from '../../constants';
import { Store } from '@ngrx/store';
import { setPlayer } from '../../store';
import { FirebasePlayerService } from '../../firebase/services/firebase-player.service';
import { PlayerCreationModalComponent } from '../components/player-creation-modal/player-creation-modal.component';
import { map, Observable, switchMap } from 'rxjs';
import { AvatarGenerator } from './avatar-generator.service';

@Injectable()
export class PlayerCreationService {

  constructor(
    private dialog: MatDialog,
    private playerService: FirebasePlayerService,
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
        const player = { id: playerId } as Player;
        this.store.dispatch(setPlayer({ player: player }));
      });
  }

  private initializeBasicPlayer(name: string, roomId: string): Observable<Player> {
    return this.generator.provide(name)
      .pipe(map(avatar => ({ name: name, room: roomId, avatar: avatar } as Player)));
  }
}
