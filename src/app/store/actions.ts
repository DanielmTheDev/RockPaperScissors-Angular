import { createAction, props } from '@ngrx/store';

export const setPlayer = createAction('[Room Joining] Set Player', props<{ playerId: string, playerInRoomId: string }>());
export const removePlayer = createAction('[Room Leaving] Remove Player');
