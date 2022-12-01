import { FirebasePlayerInRoomService } from './firebase-player-in-room.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';

describe('FirebasePlayerInRoomService', () => {
  let service: FirebasePlayerInRoomService;
  let firestore: AngularFirestore;
  let store: Store;


  beforeEach(() => {
    firestore = {} as AngularFirestore;
    store = {} as Store;
    service = new FirebasePlayerInRoomService(firestore, store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
