import { RoomComponent } from './room.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PlayerCreationService } from '../player-creation/services/player-creation.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { FirebasePlayerService } from '../firebase/services/firebase-player.service';
import constants from '../constants';
import { removePlayer } from '../store';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Player } from '../player-creation/models/player';

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
    router = { navigate: _ => {} } as Router;
    route = { snapshot: { params: {} } } as ActivatedRoute;
    const document = { valueChanges: () => of({}) } as AngularFirestoreDocument<Player>;
    playerService = { getCurrentPlayerDocument: () => of(document) } as FirebasePlayerService;
    playerCreationService = { createPlayer: _ => {} } as PlayerCreationService;
    store = {
      select: (_: string) => of({}),
      dispatch: _ => {}
    } as Store;

    component = new RoomComponent(formBuilder, router, playerCreationService, playerService, route, store);
  });

  it('creates new player OnInit if there is none in the store', () => {
    spyOn(store, 'select').and.returnValue(of({}));
    spyOn(playerCreationService, 'createPlayer');
    route.snapshot.params[constants.routeParams.id] = 'roomId';

    component.ngOnInit();

    expect(playerCreationService.createPlayer).toHaveBeenCalledWith('roomId');
  });

  it('dispatches removePlayer to store when leaving room', () => {
    spyOn(store, 'dispatch');
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.leaveRoom();

    expect(store.dispatch).toHaveBeenCalledWith(removePlayer());
  });

  it('navigates to root when leaving room', () => {
    spyOn(store, 'dispatch');
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.leaveRoom();

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
