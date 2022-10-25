import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { removePlayer, setPlayer, State } from './index';
import { StorePlayer } from './models/store-player';

export const reducers: ActionReducerMap<State> = {
  player: createReducer(
    {} as StorePlayer,
    on(setPlayer, (player, props): StorePlayer => props.player),
    on(removePlayer, (): StorePlayer => ({} as StorePlayer))),
};
