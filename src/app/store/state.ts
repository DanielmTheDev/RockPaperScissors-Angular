import { createSelector } from '@ngrx/store';
import { CurrentPlayer } from './models/current-player';

export const selectPlayer = createSelector(
  (state: object): CurrentPlayer => (state as State).player,
  (player: CurrentPlayer): CurrentPlayer => player);

export interface State {
  player: CurrentPlayer;
}
