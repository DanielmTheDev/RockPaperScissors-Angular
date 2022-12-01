import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Observable } from 'rxjs';
import firebaseConstants from '../firebase-constants';
import { Room } from '../models/room';

@Injectable()
export class FirebaseRoomService {

  constructor(private firestore: AngularFirestore) { }

  add(room: Room): Observable<string> {
    return fromPromise(this.firestore.collection(firebaseConstants.collections.rooms)
      .add(room)
      .then(roomReference => roomReference.id));
  }
}
