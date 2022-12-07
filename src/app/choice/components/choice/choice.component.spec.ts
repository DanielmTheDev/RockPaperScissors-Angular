import { ChoiceComponent } from './choice.component';
import { FirebasePlayerInRoomService } from '../../../firebase/services/firebase-player-in-room.service';

describe('ChoiceComponent', () => {
  let component: ChoiceComponent;
  let playerInRoomService: FirebasePlayerInRoomService;

  beforeEach(() => {
    playerInRoomService = {} as FirebasePlayerInRoomService;
    component = new ChoiceComponent(playerInRoomService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
