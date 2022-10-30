import { RoomCreationModalComponent } from './room-creation-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseRoomService } from '../../firebase/services/firebase-room.service';
import { of } from 'rxjs';
import { RoomCreationRequest } from '../models/room-creation-request';
import constants from '../../constants';

describe('RoomCreationModalComponent', () => {
  let component: RoomCreationModalComponent;
  let formBuilder: FormBuilder;
  let dialogRef: MatDialogRef<RoomCreationModalComponent>;
  let router: Router;
  let firebaseRoomService: FirebaseRoomService;

  beforeEach(() => {
    formBuilder = { group: (_: any) => {} } as FormBuilder;
    router = { navigate: _ => Promise.resolve(true) } as Router;
    firebaseRoomService = { add: _ => of({}) } as FirebaseRoomService;
    dialogRef = { close: _ => {} } as MatDialogRef<RoomCreationModalComponent>;

    component = new RoomCreationModalComponent(dialogRef, router, formBuilder, firebaseRoomService);
  });

  it('adds room to firebase', () => {
    const room = { name: 'SomeRoom' } as RoomCreationRequest;
    component.formGroup = { value: room } as FormGroup;
    spyOn(firebaseRoomService, 'add').and.returnValue(of('roomId'));

    component.create();

    expect(firebaseRoomService.add).toHaveBeenCalledWith(room);
  });

  it('navigates to room route with roomId as parameter', () => {
    const room = {} as RoomCreationRequest;
    component.formGroup = { value: room } as FormGroup;
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(firebaseRoomService, 'add').and.returnValue(of('roomId'));

    component.create();

    expect(router.navigate).toHaveBeenCalledWith([constants.routing.room, 'roomId']);
  });
});
