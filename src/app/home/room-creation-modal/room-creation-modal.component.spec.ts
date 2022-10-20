import { RoomCreationModalComponent } from './room-creation-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseRoomService } from '../../firebase/firebase-room.service';
import { Store } from '@ngrx/store';

describe('RoomCreationModalComponent', () => {
  let component: RoomCreationModalComponent;

  let formBuilder: FormBuilder;
  let dialogRef: MatDialogRef<RoomCreationModalComponent>;
  let router: Router;
  let firebaseRoomService: FirebaseRoomService;
  let store: Store;

  beforeEach(() => {
    formBuilder = { group: (_: any) => {} } as FormBuilder;
    router = { navigate: _ => {} } as Router;
    firebaseRoomService = {} as FirebaseRoomService;
    store = { select: (_: string) => {} } as Store;

    component = new RoomCreationModalComponent(dialogRef, router, formBuilder, firebaseRoomService, store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
