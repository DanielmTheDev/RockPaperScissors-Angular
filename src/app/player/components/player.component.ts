import { Component, Input } from '@angular/core';
import { Player } from 'src/app/firebase/models/player';
import { Room } from '../../firebase/models/room';
import { Observable } from 'rxjs';
import { FirebaseRoomService } from '../../firebase/services/firebase-room.service';
import { ActivatedRoute } from '@angular/router';
import constants from '../../constants';
import { GameType } from '../../room-creation/models/game-type';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input()
  player: Player | undefined;
  room$: Observable<Room | undefined>;
  numberOfVictories$: Observable<number>;
  gameType = GameType;

  constructor(private firebaseRoomService: FirebaseRoomService, private route: ActivatedRoute) {
    const roomId = this.route.snapshot.params[constants.routeParams.id];
    this.room$ = this.firebaseRoomService.roomValueChanges(roomId);
    this.numberOfVictories$ = this.firebaseRoomService.getNumberOfVictories(roomId, this.player?.id);
  }

  isLastOneActive(lastOneActiveId: string | null): boolean {
    return Boolean(lastOneActiveId && this.player?.id && lastOneActiveId === this.player?.id);
  }
}
