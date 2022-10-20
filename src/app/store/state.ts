import { Player } from '../player-creation/models/player';
import { Room } from '../room/models/room';
import { createSelector } from '@ngrx/store';

export const selectPlayer = createSelector(
  (state: object): Player => (state as State).player,
  (player: Player): Player => player);

export interface State {
  player: Player;
  room: Room;
}
