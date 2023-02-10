import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import constants from 'src/app/constants';
import { GameType } from '../../models/game-type';
import { FirebaseRoomService } from 'src/app/firebase/services/firebase-room.service';
import { Room } from 'src/app/firebase/models/room';

@Component({
  selector: 'room-creation-modal',
  templateUrl: './room-creation-modal.component.html',
  styleUrls: ['./room-creation-modal.component.scss']
})
export class RoomCreationModalComponent {
  gameType = GameType;

  constructor(
    private dialogRef: MatDialogRef<RoomCreationModalComponent>,
    private router: Router,
    private firebaseRoomService: FirebaseRoomService) {}

  create(gameType: GameType): void {
    this.firebaseRoomService.add({ typeOfGame: gameType } as Room)
      .subscribe(roomId => this.router.navigate([constants.routing.room, roomId]).then());
    this.dialogRef.close();
  }
}
