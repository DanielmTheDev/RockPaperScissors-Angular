import { Component } from '@angular/core';
import { Choice } from '../../models/choice';

@Component({
  selector: 'choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {
  choiceEnum = Choice;

  choose(_: Choice) {
    // add choice to firestore
  }
}
