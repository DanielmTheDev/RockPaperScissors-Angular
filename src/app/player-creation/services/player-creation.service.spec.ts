import { PlayerCreationService } from './player-creation.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FirebasePlayerService } from '../../firebase/services/firebase-player.service';
import { PlayerCreationModalComponent } from '../player-creation-modal/player-creation-modal.component';
import { of } from 'rxjs';
import { setPlayer } from '../../store';
import { Player } from '../../firebase/models/player';

describe('PlayerCreationService', () => {
  let service: PlayerCreationService;
  let dialog: MatDialog;
  let firebasePlayerService: FirebasePlayerService;
  let store: Store;

  beforeEach(() => {
    dialog = { open: (_1, _2) => {} } as MatDialog;
    firebasePlayerService = { add: _ => of({}) } as FirebasePlayerService;
    store = { dispatch: _ => {} } as Store;
    service = new PlayerCreationService(dialog, firebasePlayerService, store);
  });

  it('writes player to store', () => {
    const dialogRef = { afterClosed: () => of('daniel') } as MatDialogRef<PlayerCreationModalComponent>;
    spyOn(dialog, 'open').and.returnValue(dialogRef);
    spyOn(firebasePlayerService, 'add').and.returnValue(of('playerId'));
    spyOn(store, 'dispatch');

    service.createPlayer('roomId');

    expect(store.dispatch).toHaveBeenCalledWith(setPlayer({ player: { name: 'daniel', id: 'playerId', room: 'roomId' } as Player }));
  });
});
