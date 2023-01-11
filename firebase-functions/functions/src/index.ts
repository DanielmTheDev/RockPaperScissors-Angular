import * as admin from 'firebase-admin';

admin.initializeApp();

export { calculateResult } from './firebase/calculateResult';
export { getAvatar, getRandomNames } from './firebase/proxyCallableFunctions';
