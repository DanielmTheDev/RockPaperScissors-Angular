import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Dummy implementation for now. Will set some chosen thing just something will be visible
export const choiceUpdated = functions.firestore.document('/players/{documentId}')
  .onUpdate(async (change: any, context: any) => {
    const playerId = context.params.documentId;
    try {
      const doc = await admin.firestore().collection('players').doc(playerId).get();
      const roomId = doc.data()?.room;
      console.log('The room in question ' + roomId);
      const snapshot = await admin.firestore().collection('players').where('room', '==', roomId).get();
      let areAllChoicesPresent = true;
      let choice = '';
      snapshot.forEach((player: any) => {
        if (!player.data().choice) {
          areAllChoicesPresent = false;
          return;
        }
        choice = player.data().choice;
      });

      if (areAllChoicesPresent) {
        await admin.firestore().collection('rooms').doc(roomId).update({ winner: choice });
      }
    } catch (e) {
      console.log(e);
    }
  });
