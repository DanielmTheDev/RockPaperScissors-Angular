import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import constants from '../constants';
import { Observable } from 'rxjs';
import { Player } from '../player-creation/models/player';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

@Injectable()
export class FirebasePlayerService {
  private readonly playerCollection: AngularFirestoreCollection<Player>;

  constructor(private firestore: AngularFirestore) {
    this.playerCollection = this.firestore.collection<Player>(constants.firebase.collections.players);
  }

  valueChanges(): Observable<Player[]> {
    return this.playerCollection.valueChanges();
  }

  add(player: Player): Observable<string> {
    return fromPromise(this.playerCollection
      .add(player)
      .then(playerReference => playerReference.id));
  }
}
