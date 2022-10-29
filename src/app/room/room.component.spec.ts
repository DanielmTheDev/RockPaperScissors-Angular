import { RoomComponent } from './room.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PlayerCreationService } from '../player-creation/services/player-creation.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { FirebasePlayerService } from '../firebase/services/firebase-player.service';
import constants from '../constants';

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
    route = { snapshot: { params: {} } } as ActivatedRoute;
    const document = { valueChanges: () => of({}) };
    playerService = { getCurrentPlayerDocument: () => of(document) } as FirebasePlayerService;
    playerCreationService = { createPlayer: _ => {} } as PlayerCreationService;
    store = { select: (_: string) => of({}) } as Store;

    component = new RoomComponent(formBuilder, router, playerCreationService, playerService, route, store);
  });

  it('creates new player OnInit if there is none in the store', () => {
    spyOn(store, 'select').and.returnValue(of({}));
    spyOn(playerCreationService, 'createPlayer');
    route.snapshot.params[constants.routeParams.id] = 'roomId';

    component.ngOnInit();

    expect(playerCreationService.createPlayer).toHaveBeenCalledWith('roomId');
  });
});
