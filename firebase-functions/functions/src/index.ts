import * as admin from 'firebase-admin';

admin.initializeApp();

export { default as choiceUpdated } from './choiceUpdated';
export { getAvatar, getRandomNames } from './proxyCallableFunctions';
