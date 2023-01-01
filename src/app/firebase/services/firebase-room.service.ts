import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Observable } from 'rxjs';
import FirebaseConstants from '../constants/firebase-constants';
import { Room } from '../models/room';

@Injectable()
export class FirebaseRoomService {

  constructor(private firestore: AngularFirestore) { }

  roomValueChanges(roomId: string): Observable<Room | undefined> {
    return this.firestore
      .collection<Room>(FirebaseConstants.collections.rooms).doc(roomId)
      .valueChanges();
  }

  add(room: Room): Observable<string> {
    return fromPromise(this.firestore.collection(FirebaseConstants.collections.rooms)
      .add(room)
      .then(roomReference => roomReference.id));
  }

  restRoom(roomId: string): Observable<void> {
    return fromPromise(this.firestore
      .collection<Room>(FirebaseConstants.collections.rooms)
      .doc(roomId)
      .update({ lastOneActive: null }));
  }
}
