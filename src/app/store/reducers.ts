import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { removePlayer, setPlayer, State } from './index';
import { CurrentPlayer } from './models/current-player';

export const reducers: ActionReducerMap<State> = {
  player: createReducer(
    {} as CurrentPlayer,
    on(setPlayer, (player, props): CurrentPlayer => props.player),
    on(removePlayer, (): CurrentPlayer => ({} as CurrentPlayer))),
};
