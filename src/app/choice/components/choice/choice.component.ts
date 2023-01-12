import { Component } from '@angular/core';
import { Choice } from '../../models/choice';
import { FirebasePlayerService } from '../../../firebase/services/firebase-player.service';
import { Observable } from 'rxjs';
import { Player } from '../../../firebase/models/player';

@Component({
  selector: 'choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {
  choiceEnum = Choice;
  player$: Observable<Player | undefined>;
  constructor(private playerService: FirebasePlayerService) {
    this.player$ = this.playerService.valueChanges();
  }

  choose(choice: Choice): void {
    this.playerService.addChoice(choice).subscribe();
  }

  isIconDisabled(player: Player, choice: Choice): boolean {
    return Boolean(player.isObserver || player.choice && player.choice !== choice);
  }
}
