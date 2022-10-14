import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameType } from '../models/game-type';
import { Router } from '@angular/router';
import { RoomCreationRequest } from "../models/room-creation-request";
import constants from 'src/app/constants';
import { FirebaseRoomService } from 'src/app/firebase/firebase-room.service';

@Component({
  selector: 'room-creation-modal',
  templateUrl: './room-creation-modal.component.html',
  styleUrls: ['./room-creation-modal.component.scss']
})
export class RoomCreationModalComponent {
  formGroup: FormGroup = this.formBuilder.group({
    'name': [''],
    'numberOfPlayers': [1, Validators.min(1)],
    'score': [1, Validators.min(1)],
    'typeOfGame': [GameType.Winner]
  });

  gameType = GameType;

  constructor(
    private dialogRef: MatDialogRef<RoomCreationModalComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private firebaseRoomService: FirebaseRoomService) {}

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.firebaseRoomService.add(this.formGroup.value as RoomCreationRequest).then(roomId => {
      this.router.navigate([constants.routing.room, roomId]).then();
    })
    this.dialogRef.close();
  }
}
