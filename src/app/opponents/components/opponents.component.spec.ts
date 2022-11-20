import { OpponentsComponent } from './opponents.component';
import { of } from 'rxjs';
import { Player } from '../../firebase/models/player';
import { FirebaseOpponentService } from '../../firebase/services/firebase-opponent.service';
import { ActivatedRoute } from '@angular/router';

describe('OpponentsComponent', () => {
  let component: OpponentsComponent;
  let firebaseOpponentService: FirebaseOpponentService;
  let route: ActivatedRoute;

  beforeEach(() => {
    firebaseOpponentService = { getOpponents: _ => of([] as Player[]) } as FirebaseOpponentService;
    route = { snapshot: { params: {} } } as ActivatedRoute;

    component = new OpponentsComponent(firebaseOpponentService, route);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
