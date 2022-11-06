﻿import { Component } from '@angular/core';
import { Choice } from '../../models/choice';
import { FirebasePlayerService } from '../../../firebase/services/firebase-player.service';

@Component({
  selector: 'choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {
  choiceEnum = Choice;

  constructor(private playerService: FirebasePlayerService) {}

  choose(choice: Choice): void {
    this.playerService.addChoice(choice).subscribe();
  }
}
