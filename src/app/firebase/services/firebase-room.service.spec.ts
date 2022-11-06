import { FirebaseRoomService } from './firebase-room.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { RoomCreationRequest } from '../../home/models/room-creation-request';

describe('FirebaseRoom Service', () => {
  let service: FirebaseRoomService;
  let firestore: AngularFirestore;

  beforeEach(() => {
    firestore = { collection: _ => {} } as AngularFirestore;
    service = new FirebaseRoomService(firestore);
  });

  it('adds room to firebase', () => {
    const collection = { add: _ => Promise.resolve({ id: 'roomId' } as DocumentReference<RoomCreationRequest>) } as AngularFirestoreCollection<RoomCreationRequest>;
    spyOn(firestore, 'collection').and.returnValue(collection);

    service.add({} as RoomCreationRequest).subscribe(id => expect(id).toEqual('roomId'));
  });
});
