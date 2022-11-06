import { Component } from '@angular/core';
import { Player } from '../../player-creation/models/player';
import { FirebaseOpponentService } from '../../firebase/services/firebase-opponent.service';
import constants from '../../constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'opponents-component',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.scss']
})
export class OpponentsComponent {
  opponents: Player[] | undefined;

  constructor(private firebaseOpponentService: FirebaseOpponentService, private route: ActivatedRoute) {
    this.firebaseOpponentService.getOpponents(this.route.snapshot.params[constants.routeParams.id])
      .subscribe(opponents => this.opponents = opponents);
  }
}
