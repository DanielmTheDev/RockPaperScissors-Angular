import { Component } from '@angular/core';
import { Choice } from '../../models/choice';
import { FirebasePlayerInRoomService } from '../../../firebase/services/firebase-player-in-room.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {
  private subscription: Subscription | undefined;
  choiceEnum = Choice;
  choice: Choice | undefined;

  constructor(private playerInRoomService: FirebasePlayerInRoomService) {}

  choose(choice: Choice): void {
    this.choice = choice;
    this.subscription = this.playerInRoomService.addChoice(choice).subscribe();
  }
}
