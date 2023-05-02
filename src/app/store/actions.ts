import { createAction, props } from '@ngrx/store';
import { CurrentPlayer } from './models/current-player';

export const setPlayer = createAction('[Room Joining] Set Player', props<{ player: CurrentPlayer }>());
export const removePlayer = createAction('[Room Leaving] Remove Player');
