import { FirebaseRoomService } from './firebase-room.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Room } from '../models/room';

describe('FirebaseRoom Service', () => {
  let service: FirebaseRoomService;
  let firestore: AngularFirestore;

  beforeEach(() => {
    firestore = { collection: _ => {} } as AngularFirestore;
    service = new FirebaseRoomService(firestore);
  });

  it('adds room to firebase', () => {
    const collection = { add: _ => Promise.resolve({ id: 'roomId' } as DocumentReference<Room>) } as AngularFirestoreCollection<Room>;
    spyOn(firestore, 'collection').and.returnValue(collection);

    service.add({} as Room).subscribe(id => expect(id).toEqual('roomId'));
  });
});
