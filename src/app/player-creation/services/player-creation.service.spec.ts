import { PlayerCreationService } from './player-creation.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { FirebasePlayerService } from '../../firebase/services/firebase-player.service';

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
