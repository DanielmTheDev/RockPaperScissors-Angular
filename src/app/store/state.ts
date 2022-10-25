import { createSelector } from '@ngrx/store';
import { StorePlayer } from './models/store-player';

export const selectPlayer = createSelector(
  (state: object): StorePlayer => (state as State).player,
  (player: StorePlayer): StorePlayer => player);

export interface State {
  player: StorePlayer;
}
