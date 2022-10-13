import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Player } from '../room/models/player';
import constants from '../constants';
import { Observable } from 'rxjs';

@Injectable()
export class FirebasePlayerService {
  private readonly playerCollection: AngularFirestoreCollection<Player>;

  constructor(private firestore: AngularFirestore) {
    this.playerCollection = this.firestore.collection<Player>(constants.firebase.collections.players);
  }

  valueChanges(): Observable<Player[]> {
    return this.playerCollection.valueChanges();
  }

  add(player: Player): Promise<string> {
    return this.playerCollection.add(player).then(playerReference => playerReference.id);
  }
}
