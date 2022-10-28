import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import constants from '../constants';

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [constants.playerKey],
    rehydrate: true })(reducer);
}

export const rehydrationMetaReducer: MetaReducer<any, any> = localStorageSyncReducer;