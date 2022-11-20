import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from '../../firebase/models/room';
import constants from 'src/app/constants';
import { FirebaseRoomService } from '../../firebase/services/firebase-room.service';
import { GameType } from '../models/game-type';
import { RandomNamesProvider } from '../services/random-names-provider.service';
import { LoadingStatus } from '../../spinner/models/loadingStatus';

@Component({
  selector: 'room-creation-modal',
  templateUrl: './room-creation-modal.component.html',
  styleUrls: ['./room-creation-modal.component.scss']
})
export class RoomCreationModalComponent implements OnInit {
  formGroup = this.formBuilder.nonNullable.group({
    name: [''],
    numberOfPlayers: [1, Validators.min(1)],
    score: [1, Validators.min(1)],
    typeOfGame: [GameType.Winner]
  });
  gameType = GameType;
  loadingStatus: LoadingStatus = { isLoading: false };

  constructor(
    private dialogRef: MatDialogRef<RoomCreationModalComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private firebaseRoomService: FirebaseRoomService,
    private randomNamesProvider: RandomNamesProvider) {}

  ngOnInit(): void {
    this.setRandomRoomName();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.firebaseRoomService.add(this.formGroup.value as Room).subscribe(roomId => {
      this.router.navigate([constants.routing.room, roomId]).then();
    });
    this.dialogRef.close();
  }

  private setRandomRoomName(): void {
    this.loadingStatus.isLoading = true;
    this.randomNamesProvider
      .provide(this.formGroup.controls.name.value)
      .subscribe(randomName => {
        this.formGroup.controls.name.setValue(randomName);
        this.loadingStatus.isLoading = false;
      });
  }
}
