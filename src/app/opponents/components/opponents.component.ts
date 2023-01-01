import { Component, Input } from '@angular/core';
import { Player } from '../../firebase/models/player';
import { FirebaseOpponentService } from '../../firebase/services/firebase-opponent.service';
import constants from '../../constants';
import { ActivatedRoute } from '@angular/router';
import { Choice } from 'src/app/choice/models/choice';
import { Observable } from 'rxjs';

@Component({
  selector: 'opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.scss']
})
export class OpponentsComponent {
  @Input()
  hasCurrentPlayerChosen = false;
  opponents$: Observable<Player[]> | undefined;
  choiceEnum = Choice;

  constructor(private firebaseOpponentService: FirebaseOpponentService, private route: ActivatedRoute) {
    this.opponents$ = this.firebaseOpponentService.getOpponents(this.route.snapshot.params[constants.routeParams.id]);
  }
}
