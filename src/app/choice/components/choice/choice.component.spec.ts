import { ChoiceComponent } from './choice.component';
import { FirebasePlayerService } from '../../../firebase/firebase-player.service';

describe('ChoiceComponent', () => {
  let component: ChoiceComponent;
  let playerService: FirebasePlayerService;

  beforeEach(() => {
    playerService = {} as FirebasePlayerService;
    component = new ChoiceComponent(playerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
