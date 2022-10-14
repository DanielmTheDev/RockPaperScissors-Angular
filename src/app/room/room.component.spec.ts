import { RoomComponent } from './room.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { FirebasePlayerService } from '../firebase/firebase-player.service';

describe('RoomComponent', () => {
  let component: RoomComponent;

  let formBuilder: FormBuilder;
  let matDialog: MatDialog;
  let router: Router;
  let route: ActivatedRoute;
  let playerService: FirebasePlayerService;

  beforeEach(() => {
    formBuilder = {} as FormBuilder;
    matDialog = {} as MatDialog;
    router = {} as Router;
    route = {} as ActivatedRoute;
    playerService = {} as FirebasePlayerService;

    component = new RoomComponent(formBuilder, matDialog, router, route, playerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
