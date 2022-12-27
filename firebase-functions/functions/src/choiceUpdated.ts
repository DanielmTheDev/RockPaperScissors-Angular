import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getLosers, hasEveryoneChosen } from './choiceOperations';

export default functions.firestore.document('/players/{documentId}')
  .onUpdate(async (change: any, context: any) => {
    try {
      const roomId = await getCurrentRoomId(context.params.documentId as string);
      const playersInSameRoom = (await admin.firestore().collection('players').where('room', '==', roomId).get()).docs;
      if (!hasEveryoneChosen(playersInSameRoom)) {
        return;
      }
      const losers = getLosers(playersInSameRoom);
      if (!losers.length) {
        await Promise.all(resetAllChoices(playersInSameRoom));
        return;
      }
      // deactivate all the losers and disable them in the FE (maybe even check if all the choices were from active users first)
      // if only one player remains, set him as the winner and display in FE
      await admin.firestore().collection('rooms').doc(roomId).update({ winner: losers[0] });
    } catch (e) {
      console.log(e);
    }
  });

async function getCurrentRoomId(playerId: string): Promise<string> {
  const currentPlayer = await admin.firestore().collection('players').doc(playerId).get();
  return currentPlayer.data()?.room;
}

function resetAllChoices(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): (Promise<FirebaseFirestore.WriteResult> | undefined)[] {
  return players.map(playerDoc => admin.firestore().collection('players').doc(playerDoc.id)?.update({ choice: null }));
}
