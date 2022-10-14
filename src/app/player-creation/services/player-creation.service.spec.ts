import { PlayerCreationService } from './player-creation.service';
import { MatDialog } from '@angular/material/dialog';
import { FirebasePlayerService } from '../../firebase/firebase-player.service';

describe('PlayerCreationService', () => {
  let service: PlayerCreationService;

  let dialog: MatDialog;
  let firebasePlayerService: FirebasePlayerService;

  beforeEach(() => {
    service = new PlayerCreationService(dialog, firebasePlayerService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
