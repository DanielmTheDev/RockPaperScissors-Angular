import { FirebasePlayerService } from './firebase-player.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('FirebasePlayerService', () => {
  let service: FirebasePlayerService;
  let fireStore: AngularFirestore;

  beforeEach(() => {
    fireStore = { collection: _ => {} } as AngularFirestore;
    service = new FirebasePlayerService(fireStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
