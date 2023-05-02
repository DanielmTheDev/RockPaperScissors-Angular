import { Component, HostListener } from '@angular/core';
import { FirebasePlayerService } from '../../../firebase/services/firebase-player.service';
import { Observable } from 'rxjs';
import { Player } from '../../../firebase/models/player';
import { Choice } from 'src/app/firebase/models/choice';

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

  @HostListener('document:keydown.s', ['$event'])
  chooseScissors(event: KeyboardEvent): void {
    this.choose(Choice.Scissors);
    event.preventDefault();
  }

  @HostListener('document:keydown.r', ['$event'])
  chooseRock(event: KeyboardEvent): void {
    this.choose(Choice.Rock);
    event.preventDefault();
  }

  @HostListener('document:keydown.p', ['$event'])
  choosePaper(event: KeyboardEvent): void {
    this.choose(Choice.Paper);
    event.preventDefault();
  }

  isIconDisabled(player: Player, choice: Choice): boolean {
    return Boolean(player.isObserver || player.choice && player.choice !== choice);
  }
}
