import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameType } from '../models/game-type';
import { Router } from '@angular/router';
import constants from '../../constants';

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
    private formBuilder: FormBuilder) {}

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.router.navigate([constants.routing.room, this.formGroup.value.name]).then();
    this.dialogRef.close();
  }
}
