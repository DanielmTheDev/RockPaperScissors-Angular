import { Component, Input, OnInit } from '@angular/core';
import { combineLatestWith, Observable } from 'rxjs';
import { GameType } from '../../../room-creation/models/game-type';
import { Player } from '../../../firebase/models/player';
import constants from '../../../constants';
import { FirebaseRoomService } from '../../../firebase/services/firebase-room.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../../firebase/models/room';

@Component({
  selector: 'result-count',
  templateUrl: './result-count.component.html',
  styleUrls: ['./result-count.component.scss']
})
export class ResultCountComponent implements OnInit {
  @Input()
  player: Player | undefined;
  roomAndVictories$: Observable<[Room | undefined, number]> | undefined;
  gameType = GameType;

  constructor(private firebaseRoomService: FirebaseRoomService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.params[constants.routeParams.id];

    this.roomAndVictories$ = this.firebaseRoomService.roomValueChanges(roomId).pipe(
      combineLatestWith(this.firebaseRoomService.getNumberOfVictories(roomId, this.player?.id)));
  }
}
