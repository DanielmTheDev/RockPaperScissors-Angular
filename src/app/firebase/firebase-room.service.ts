import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { RoomCreationRequest } from '../home/models/room-creation-request';

export class FirebaseRoomService {

  constructor(private firestore: AngularFirestore) { }

  add(room: RoomCreationRequest): Promise<string> {
    return this.firestore.collection('rooms')
      .add(room)
      .then(roomReference => roomReference.id);
  }
}
