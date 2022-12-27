import { Component, OnInit } from '@angular/core';
import { Choice } from '../../models/choice';
import { FirebasePlayerService } from '../../../firebase/services/firebase-player.service';

@Component({
  selector: 'choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  choiceEnum = Choice;
  choice: Choice | undefined;
  constructor(private playerService: FirebasePlayerService) {}

  ngOnInit(): void {
    this.playerService.valueChanges().subscribe(player => this.choice = player?.choice);
  }

  choose(choice: Choice): void {
    this.playerService.addChoice(choice).subscribe();
  }
}
