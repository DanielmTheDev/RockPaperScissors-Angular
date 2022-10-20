import { createAction, props } from '@ngrx/store';
import { Player } from '../player-creation/models/player';
import { Room } from '../room/models/room';

export const setPlayer = createAction('[Room Joining] Set Player', props<{ player: Player }>());
export const removePlayer = createAction('[Room Leaving] Remove Player');

export const setRoom = createAction('[Room Creation] Set Room', props<{ room: Room }>());