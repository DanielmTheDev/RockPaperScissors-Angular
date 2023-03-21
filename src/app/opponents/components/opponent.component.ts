import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/firebase/models/player';
import { Room } from '../../firebase/models/room';
import { Observable } from 'rxjs';
import { FirebaseRoomService } from '../../firebase/services/firebase-room.service';
import { ActivatedRoute } from '@angular/router';
import constants from '../../constants';
import { GameType } from '../../room-creation/models/game-type';

@Component({
  selector: 'opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.scss']
})
export class OpponentComponent implements OnInit {
  @Input()
  player: Player | undefined;
  room$: Observable<Room | undefined> | undefined;
  gameType = GameType;

  constructor(private firebaseRoomService: FirebaseRoomService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.params[constants.routeParams.id];
    this.room$ = this.firebaseRoomService.roomValueChanges(roomId);
  }

  isLastOneActive(lastOneActiveId: string | undefined): boolean {
    return Boolean(lastOneActiveId && this.player?.id && lastOneActiveId === this.player?.id);
  }
}
