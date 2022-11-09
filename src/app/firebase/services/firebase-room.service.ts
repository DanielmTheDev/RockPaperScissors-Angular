import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Observable } from 'rxjs';
import firebaseConstants from '../firebaseConstants';
import { RoomCreationRequest } from '../../room-creation/models/room-creation-request';

@Injectable()
export class FirebaseRoomService {

  constructor(private firestore: AngularFirestore) { }

  add(room: RoomCreationRequest): Observable<string> {
    return fromPromise(this.firestore.collection(firebaseConstants.collections.rooms)
      .add(room)
      .then(roomReference => roomReference.id));
  }
}
