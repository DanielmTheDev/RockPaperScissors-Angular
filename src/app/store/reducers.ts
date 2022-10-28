import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Player } from '../player-creation/models/player';
import { removePlayer, setPlayer, State } from './index';

export const reducers: ActionReducerMap<State> = {
  player: createReducer(
    {} as Player,
    on(setPlayer, (player, props): Player => props.player),
    on(removePlayer, (): Player => ({} as Player))),
};
