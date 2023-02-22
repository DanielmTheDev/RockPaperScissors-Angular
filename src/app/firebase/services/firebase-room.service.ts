import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { map, Observable, switchMap, take } from 'rxjs';
import FirebaseConstants from '../constants/firebase-constants';
import { Room } from '../models/room';
import { Game } from '../models/game';

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

  startNewGame(roomId: string): Observable<void> {
    const roomDoc = this.firestore
      .collection<Room>(FirebaseConstants.collections.rooms)
      .doc(roomId);
    return roomDoc.get().pipe(
      take(1),
      switchMap(room => {
        const games = (room.data()?.games || []).concat({} as Game);
        return fromPromise(roomDoc.update({ games }));
      }));
  }

  getNumberOfVictories(roomId: string, playerId?: string): Observable<number> {
    return this.firestore.collection<Room>(FirebaseConstants.collections.rooms).doc(roomId).get()
      .pipe(map(room =>
        room.data()?.games?.filter(game => game.lastOneActive === playerId).length ?? 0
      ));
  }
}
