import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import constants from 'src/app/constants';
import { GameType } from '../../models/game-type';
import { LoadingStatus } from 'src/app/shared-lib/spinner/models/loadingStatus';
import { FirebaseRoomService } from 'src/app/firebase/services/firebase-room.service';
import { RandomNamesProvider } from '../../services/random-names-provider.service';
import { Room } from 'src/app/firebase/models/room';

@Component({
  selector: 'room-creation-modal',
  templateUrl: './room-creation-modal.component.html',
  styleUrls: ['./room-creation-modal.component.scss']
})
export class RoomCreationModalComponent implements OnInit {
  formGroup = this.formBuilder.nonNullable.group({
    name: [''],
    typeOfGame: [GameType.Loser]
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
    this.firebaseRoomService.add(this.formGroup.value as Room)
      .subscribe(roomId => this.router.navigate([constants.routing.room, roomId]).then());
    this.dialogRef.close();
  }

  private setRandomRoomName(): void {
    this.loadingStatus.isLoading = true;
    this.randomNamesProvider
      .provide(this.formGroup.controls.name.value)
      .subscribe({
        next: randomName => {
          this.formGroup.controls.name.setValue(randomName);
          this.loadingStatus.isLoading = false;
        },
        error: _error => {
          this.formGroup.controls.name.setValue('');
          this.loadingStatus.isLoading = false;
        }
      });
  }
}
