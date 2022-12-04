import { Component, OnInit } from '@angular/core';
import { Player } from '../../firebase/models/player';
import { FirebaseOpponentService } from '../../firebase/services/firebase-opponent.service';
import constants from '../../constants';
import { ActivatedRoute } from '@angular/router';
import { Choice } from 'src/app/choice/models/choice';

@Component({
  selector: 'opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.scss']
})
export class OpponentsComponent implements OnInit {
  opponents: Player[] | undefined;
  choiceEnum = Choice;

  constructor(private firebaseOpponentService: FirebaseOpponentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.firebaseOpponentService.getOpponents(this.route.snapshot.params[constants.routeParams.id])
      .subscribe(opponents => this.opponents = opponents);
  }
}
