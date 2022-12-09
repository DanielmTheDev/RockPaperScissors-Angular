import { Component, Input } from '@angular/core';
import { Player } from 'src/app/firebase/models/player';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input()
  player: Player | undefined;
}
