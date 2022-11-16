import { RoomCreationModalComponent } from './room-creation-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseRoomService } from '../../firebase/services/firebase-room.service';
import { of } from 'rxjs';
import { RoomCreationRequest } from '../models/room-creation-request';
import constants from '../../constants';
import { RandomNamesProvider } from '../services/random-names-provider.service';

describe('RoomCreationModalComponent', () => {
  let component: RoomCreationModalComponent;
  let formBuilder: FormBuilder;
  let dialogRef: MatDialogRef<RoomCreationModalComponent>;
  let router: Router;
  let firebaseRoomService: FirebaseRoomService;
  let randomNamesProvider: RandomNamesProvider;
  let group: FormGroup;
  let nameFormControl: FormControl<string>;

  beforeEach(() => {
    nameFormControl = { setValue: _ => {}, value: '' } as FormControl<string>;
    group = {
      controls: {
        name: nameFormControl
      }
    } as FormGroup<{ name: FormControl<string> }>;
    formBuilder = {
      nonNullable: {
        group: (_: any) => group
      },
    } as FormBuilder;
    router = { navigate: _ => Promise.resolve(true) } as Router;
    firebaseRoomService = { add: _ => of({}) } as FirebaseRoomService;
    dialogRef = { close: _ => {} } as MatDialogRef<RoomCreationModalComponent>;
    randomNamesProvider = { provide: (..._) => of('') } as RandomNamesProvider;

    component = new RoomCreationModalComponent(dialogRef, router, formBuilder, firebaseRoomService, randomNamesProvider);
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

  it('sets loading property to false when random name is provided onInit', () => {
    component.ngOnInit();

    expect(component.isLoading).toBeFalse();
  });

  it('sets formGroups name with what is returned from service', () => {
    spyOn(randomNamesProvider, 'provide').and.returnValue(of('ImenE'));
    spyOn(nameFormControl, 'setValue');

    component.ngOnInit();

    expect(nameFormControl.setValue).toHaveBeenCalledWith('ImenE');
  });
});
