import { PlayerCreationService } from './player-creation.service';
import { MatDialog } from '@angular/material/dialog';
import { FirebasePlayerService } from '../../firebase/firebase-player.service';
import { Store } from '@ngrx/store';

describe('PlayerCreationService', () => {
  let service: PlayerCreationService;

  let dialog: MatDialog;
  let firebasePlayerService: FirebasePlayerService;
  let store: Store;

  beforeEach(() => {
    service = new PlayerCreationService(dialog, firebasePlayerService, store)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
