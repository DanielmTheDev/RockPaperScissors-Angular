import { RoomCreationModalComponent } from './room-creation-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseRoomService } from '../../firebase/firebase-room.service';

describe('RoomCreationModalComponent', () => {
  let component: RoomCreationModalComponent;

  let formBuilder: FormBuilder;
  let dialogRef: MatDialogRef<RoomCreationModalComponent>;
  let router: Router;
  let firebaseRoomService: FirebaseRoomService;

  beforeEach(() => {
    formBuilder = { group: (_: any) => {} } as FormBuilder;
    router = { navigate: _ => {} } as Router;
    firebaseRoomService = {} as FirebaseRoomService;

    component = new RoomCreationModalComponent(dialogRef, router, formBuilder, firebaseRoomService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
