import * as functions from 'firebase-functions';
import { Change } from 'firebase-functions';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export const choiceUpdated = functions.firestore.document('/players/{documentId}')
  .onUpdate((change: Change<QueryDocumentSnapshot>, context: any) => {
    admin.initializeApp();
    const playerId = context.params.documentId;
    admin.firestore().collection('players').doc(playerId).get()
      .then((doc: any) => {
        // get the room where the player is
        const roomId = doc.data().room;
        console.log('The room in question ' + roomId);

        // get all the players in the same room
        admin.firestore().collection('players').where('room', '==', roomId).get()
          .then((snapshot: any) => {
            const playersWithChoices = [];
            let areAllChoicesPresent = true;

            snapshot.forEach((player: any) => {
              if (!player.data().choices) {
                areAllChoicesPresent = false;
                return;
              }
              playersWithChoices.push(player.data());
            });
            console.log('should we set a result? ' + areAllChoicesPresent);

            if (areAllChoicesPresent) {
              admin.firestore().collection('rooms').doc(roomId).update({ winner: 'daniel as usual!' });
            }
          });
      });
  });
