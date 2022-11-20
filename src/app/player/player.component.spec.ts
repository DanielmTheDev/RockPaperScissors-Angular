import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  beforeEach(async () => {
    component = new PlayerComponent();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
