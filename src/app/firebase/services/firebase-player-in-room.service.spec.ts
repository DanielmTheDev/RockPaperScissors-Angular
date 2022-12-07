import { FirebasePlayerInRoomService } from './firebase-player-in-room.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';

describe('FirebasePlayerInRoomService', () => {
  let service: FirebasePlayerInRoomService;
  let firestore: AngularFirestore;
  let store: Store;


  beforeEach(() => {
    firestore = { collection: _ => {} } as AngularFirestore;
    store = { select: (_: object) => {} } as Store;
    service = new FirebasePlayerInRoomService(firestore, store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
