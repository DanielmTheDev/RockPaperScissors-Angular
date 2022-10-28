import { FirebasePlayerService } from 'src/app/firebase/services/firebase-player.service';
import { ChoiceComponent } from './choice.component';

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
