import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable, switchMap } from 'rxjs';
import { CurrentPlayer } from '../../store/models/current-player';
import { Player } from '../models/player';
import { Store } from '@ngrx/store';
import { selectPlayer } from '../../store';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Choice } from '../../choice/models/choice';
import FirebaseConstants from '../constants/firebase-constants';

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
      .pipe(switchMap(player => player.valueChanges()));
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
      switchMap(document => fromPromise(document.update({ choice }))));
  }

  getCurrentPlayerDocument(): Observable<AngularFirestoreDocument<Player>> {
    return this.player$.pipe(map(player => this.playerCollection.doc(player.id)));
  }

  resetAllPlayersOfTheRoom(roomId: string): Observable<void> {
    return this.firestore
      .collection<Player>(FirebaseConstants.collections.players, ref => ref
        .where(FirebaseConstants.keys.room, '==', roomId))
     .get()
      .pipe(
        map(querySnapshot => querySnapshot.forEach(doc => this.updateObservationStatus(doc.id, false))));
  }

  private updateObservationStatus(playerId: string, isObserver: boolean): void {
    this.playerCollection.doc(playerId).update({ isObserver }).then();
  }
}
