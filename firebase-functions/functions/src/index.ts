import * as admin from 'firebase-admin';

admin.initializeApp();

export { calculateResult } from './calculateResult';
export { getAvatar, getRandomNames } from './proxyCallableFunctions';
