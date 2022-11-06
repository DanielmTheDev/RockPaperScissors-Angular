import { FirebaseRoomService } from './firebase-room.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('FirebaseRoom Service', () => {
  let service: FirebaseRoomService;
  let firestore: AngularFirestore;

  beforeEach(() => {
    firestore = {} as AngularFirestore;

    service = new FirebaseRoomService(firestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
