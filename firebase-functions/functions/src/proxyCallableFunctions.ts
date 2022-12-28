import * as functions from 'firebase-functions';

export default functions.https.onCall(async data => {
  const url = 'https://api.multiavatar.com/';
  const response = await fetch(`${url}${data.playerName}?apikey=8IPOBEe7WmXA26`);
  return await response.text();
});

// next up: same thing for random names
