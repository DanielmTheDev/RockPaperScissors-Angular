import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { CurrentPlayer } from '../../store/models/current-player';
import { Player } from '../models/player';
import { Store } from '@ngrx/store';
import { selectPlayer } from '../../store';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import FirebaseConstants from '../constants/firebase-constants';
import { Choice } from '../models/choice';

@Injectable()
export class FirebasePlayerService {
  private readonly playerCollection: AngularFirestoreCollection<Player>;
  private readonly player$: Observable<CurrentPlayer>;

  constructor(private firestore: AngularFirestore, private store: Store) {
    this.playerCollection = this.firestore.collection<Player>(FirebaseConstants.collections.players);
    this.player$ = this.store.select(selectPlayer);
  }

  valueChanges(): Observable<Player | undefined> {
    return this.getCurrentPlayerDocument()
      .pipe(switchMap(player => player ? player.valueChanges({ idField: 'id' }) : of(undefined)));
  }

  add(player: Player): Observable<string> {
    return fromPromise(this.playerCollection
      .add(player)
      .then(playerReference => playerReference.id));
  }

  remove(playerId: string): Observable<void> {
    return fromPromise(this.playerCollection.doc(playerId).delete());
  }

  addChoice(choice: Choice): Observable<void> {
    return this.getCurrentPlayerDocument().pipe(
      switchMap(document => document ? fromPromise(document.update({ choice })) : Promise.resolve()));
  }

  getCurrentPlayerDocument(): Observable<AngularFirestoreDocument<Player> | undefined> {
    return this.player$.pipe(map(player => player.id ? this.playerCollection.doc(player.id) : undefined));
  }

  resetAllPlayersOfTheRoom(roomId: string): Observable<void> {
    return this.firestore
      .collection<Player>(FirebaseConstants.collections.players, ref => ref
        .where(FirebaseConstants.keys.room, '==', roomId))
      .get()
      .pipe(
        map(querySnapshot => querySnapshot.forEach(doc => this.updateObservationStatus(doc.id, false))));
  }

  getObserverPlayers(roomId: string): Observable<Player[]> {
    return this.firestore
      .collection<Player>(FirebaseConstants.collections.players, ref => ref
        .where(FirebaseConstants.keys.room, '==', roomId)
        .where(FirebaseConstants.keys.isObserver, '==', true))
      .valueChanges();
  }

  updateCurrent(updateData: Partial<Player>): Observable<void> {
    return this.getCurrentPlayerDocument().pipe(switchMap(doc => from(doc ? doc.update(updateData) : of(undefined))));
  }

  private updateObservationStatus(playerId: string, isObserver: boolean): void {
    this.playerCollection.doc(playerId).update({ isObserver }).then();
  }
}
