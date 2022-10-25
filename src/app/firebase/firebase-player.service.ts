import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import constants from '../constants';
import { map, Observable } from 'rxjs';
import { Player } from '../player-creation/models/player';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Choice } from '../choice/models/choice';
import { Store } from '@ngrx/store';
import { selectPlayer } from '../store';
import { StorePlayer } from '../store/models/store-player';

@Injectable()
export class FirebasePlayerService {
  private readonly playerCollection: AngularFirestoreCollection<Player>;
  private readonly player$: Observable<StorePlayer>;

  constructor(private firestore: AngularFirestore, private store: Store) {
    this.playerCollection = this.firestore.collection<Player>(constants.firebase.collections.players);
    this.player$ = this.store.select(selectPlayer);
  }

  valueChanges(): Observable<Player[]> {
    return this.playerCollection.valueChanges();
  }

  add(player: Player): Observable<string> {
    return fromPromise(this.playerCollection
      .add(player)
      .then(playerReference => playerReference.id));
  }

  getCurrentPlayerDocument(): Observable<AngularFirestoreDocument<Player>> {
    return this.player$.pipe(map(player => this.playerCollection.doc(player.id)));
  }

  addChoiceForCurrentPlayer(choice: Choice): Observable<void> {
    return this.getCurrentPlayerDocument().pipe(map(document => {
      document.get().subscribe(playerSnapshot => {
        const choices = (playerSnapshot.data()?.choices || []).concat(choice);
        return fromPromise(document.update({ choices }));
      });
    }));
  }
}
