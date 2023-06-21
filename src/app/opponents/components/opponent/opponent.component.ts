import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/firebase/models/player';
import { Room } from '../../../firebase/models/room';
import { combineLatest, map, Observable } from 'rxjs';
import { FirebaseRoomService } from '../../../firebase/services/firebase-room.service';
import { ActivatedRoute } from '@angular/router';
import constants from '../../../constants';
import { GameType } from '../../../room-creation/models/game-type';
import { FirebaseOpponentService } from '../../../firebase/services/firebase-opponent.service';

@Component({
  selector: 'opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.scss']
})
export class OpponentComponent implements OnInit {
  @Input()
  player: Player | undefined;
  gameType = GameType;
  roomAndOpponents$: Observable<{ room: Room | undefined; opponents: Player[] }> | undefined;

  constructor(private firebaseRoomService: FirebaseRoomService, private firebaseOpponentService: FirebaseOpponentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.params[constants.routeParams.id];
    const room$ = this.firebaseRoomService.roomValueChanges(roomId);
    const opponents$ = this.firebaseOpponentService.getOpponents(this.route.snapshot.params[constants.routeParams.id]);

    this.roomAndOpponents$ = combineLatest([room$, opponents$]).pipe(map(([room, players]) => ({
      room,
      opponents: players
    })));
  }

  isLastOneActive(room: Room | undefined): boolean {
    if (!room) {
      return false;
    }
    return this.firebaseRoomService.isLastOneActive(room, this.player?.id);
  }
}
