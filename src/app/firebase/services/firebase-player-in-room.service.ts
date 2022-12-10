import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap, take } from 'rxjs';
import { CurrentPlayer } from '../../store/models/current-player';
import { Store } from '@ngrx/store';
import FirebaseConstants from '../constants/firebase-constants';
import { selectPlayer } from '../../store';
import { PlayerInRoom } from '../models/playerInRoom';
import firebase from 'firebase/compat/app';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Choice } from '../../choice/models/choice';

@Injectable()
export class FirebasePlayerInRoomService {
  private readonly playerInRoomAngularCollection: AngularFirestoreCollection<PlayerInRoom>;
  private readonly player$: Observable<CurrentPlayer>;

  constructor(private firestore: AngularFirestore, private store: Store) {
    this.playerInRoomAngularCollection = this.firestore.collection<PlayerInRoom>(FirebaseConstants.collections.playersInRoom);
    this.player$ = this.store.select(selectPlayer);
  }

  add(playerInRoom: PlayerInRoom): Observable<firebase.firestore.DocumentReference<PlayerInRoom>> {
    return fromPromise(this.playerInRoomAngularCollection
      .add(playerInRoom));
  }

  getCurrentPlayerInRoomDocument(): Observable<PlayerInRoom | undefined> {
    return this.player$.pipe(switchMap(player =>
      player.playerInRoomId
        ? this.playerInRoomAngularCollection.doc(player.playerInRoomId).valueChanges()
        : of({} as PlayerInRoom)));
  }

  addChoice(choice: Choice): Observable<void> {
    return this.player$.pipe(
      take(1),
      switchMap(player => fromPromise(this.playerInRoomAngularCollection.doc(player.playerInRoomId).update({ choiceForCurrentRound: choice }))));
  }

  remove(playerInRoomId: string): Observable<void> {
    return fromPromise(this.playerInRoomAngularCollection.doc(playerInRoomId).delete());
  }
}
