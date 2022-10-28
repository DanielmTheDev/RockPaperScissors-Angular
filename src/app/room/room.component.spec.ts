import { RoomComponent } from './room.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PlayerCreationService } from '../player-creation/services/player-creation.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { FirebasePlayerService } from '../firebase/services/firebase-player.service';

describe('RoomComponent', () => {
  let component: RoomComponent;

  let formBuilder: FormBuilder;
  let router: Router;
  let route: ActivatedRoute;
  let playerService: FirebasePlayerService;
  let playerCreationService: PlayerCreationService;
  let store: Store;

  beforeEach(() => {
    formBuilder = {} as FormBuilder;
    router = {} as Router;
    route = {} as ActivatedRoute;
    const document = { valueChanges: () => of({}) };
    playerService = { getCurrentPlayerDocument: () => of(document) } as FirebasePlayerService;
    playerCreationService = {} as PlayerCreationService;
    store = { select: (_: string) => {} } as Store;

    component = new RoomComponent(formBuilder, router, playerCreationService, playerService, route, store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
