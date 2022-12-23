import { createAction, props } from '@ngrx/store';
import { Player } from '../firebase/models/player';

export const setPlayer = createAction('[Room Joining] Set Player', props<{ player: Player }>());
export const removePlayer = createAction('[Room Leaving] Remove Player');
