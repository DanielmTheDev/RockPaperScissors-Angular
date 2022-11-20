import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Player } from '../models/player';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Store } from '@ngrx/store';
import { selectPlayer } from '../../store';
import firebaseConstants from '../firebaseConstants';
import { CurrentPlayer } from '../../store/models/current-player';

@Injectable()
export class FirebaseOpponentService {
  constructor(private firestore: AngularFirestore, private store: Store) { }

  getOpponents(roomId: string): Observable<Player[]> {
    return this.store.select(selectPlayer).pipe(switchMap(player =>
      this.getOpponentsFromFirestore(roomId, player)
        .pipe(map(snapshot => this.mapToPlayers(snapshot)))));
  }

  private getOpponentsFromFirestore(roomId: string, player: CurrentPlayer): Observable<DocumentChangeAction<Player>[]> {
    return this.firestore
      .collection<Player>(firebaseConstants.collections.players, ref => ref
        .where(firebaseConstants.keys.room, '==', roomId)
        .where(firebase.firestore.FieldPath.documentId(), '!=', player.id))
      .snapshotChanges();
  }

  private mapToPlayers(snapshot: DocumentChangeAction<Player>[]): Player[] {
    return snapshot.map(item => ({
      ...item.payload.doc.data(),
      id: item.payload.doc.id,
    }));
  }
}
