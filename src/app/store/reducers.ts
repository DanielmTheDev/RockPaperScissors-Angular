import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { Player } from '../player-creation/models/player';
import { State, setPlayer, setRoom, removePlayer } from './index';
import { Room } from '../room/models/room';

export const reducers: ActionReducerMap<State> = {
  player: createReducer(
    {} as Player,
    on(setPlayer, (player, props): Player => props.player),
    on(removePlayer, (): Player => ({} as Player))),
  room: createReducer({} as Room, on(setRoom, (room, props): Room => props.room))
};
