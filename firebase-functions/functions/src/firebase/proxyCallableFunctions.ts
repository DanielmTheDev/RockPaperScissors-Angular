import fetch from 'node-fetch';
import * as functions from 'firebase-functions';

export const getAvatar = functions.https.onCall(async data => {
  const url = `https://api.multiavatar.com/${data.playerName}?apikey=8IPOBEe7WmXA26`;
  const response = await fetch(url);
  return await response.text();
});

export const getRandomNames = functions.https.onCall(async () => {
  const url = 'https://names.drycodes.com/40?nameOptions=funnyWords&combine=1';
  const response = await fetch(url);
  return await response.json();
});

