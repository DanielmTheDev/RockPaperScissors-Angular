import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { Player } from './models/player';
import { getPlayersToDeactivate, hasEveryoneChosen } from './choiceOperations';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import DocumentData = firestore.DocumentData;

export const calculateResult = functions.firestore.document('/players/{documentId}')
  .onUpdate(async (change: any, context: any) => {
    try {
      const roomId = await getCurrentRoomId(context.params.documentId as string);
      const initiallyActivePlayers = await getActivePlayersInRoom(roomId);
      if (!hasEveryoneChosen(initiallyActivePlayers)) {
        return;
      }
      await updatePlayers(initiallyActivePlayers, { choice: null });
      const playersToDeactivate = await getPlayersToDeactivate(initiallyActivePlayers, roomId);
      if (!playersToDeactivate.length) {
        return;
      }
      await updatePlayers(playersToDeactivate, { isObserver: true });
      await determineLastOneActive(initiallyActivePlayers, playersToDeactivate, roomId);
    } catch (e) {
      console.log(e);
    }
  });

async function determineLastOneActive(initiallyActivePlayers: QueryDocumentSnapshot<DocumentData>[], playersToDeactivate: QueryDocumentSnapshot<DocumentData>[], roomId: string): Promise<void> {
  const stillActivePlayers = initiallyActivePlayers.filter(player => !playersToDeactivate.includes(player));
  if (stillActivePlayers.length === 1) {
    await admin.firestore().collection('rooms').doc(roomId).update({ lastOneActive: stillActivePlayers[0].id });
    await updatePlayers(stillActivePlayers, { isObserver: true });
  }
}

async function getActivePlayersInRoom(roomId: string): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  return (await admin.firestore().collection('players').where('room', '==', roomId).get())
    .docs.filter(playerDoc => !(playerDoc.data() as Player).isObserver);
}

async function getCurrentRoomId(playerId: string): Promise<string> {
  const currentPlayer = await admin.firestore().collection('players').doc(playerId).get();
  return currentPlayer.data()?.room;
}

function updatePlayers(players: QueryDocumentSnapshot<DocumentData>[], updateData: Player): Promise<Awaited<FirebaseFirestore.WriteResult | undefined>[]> {
  return Promise.all(players.map(playerDoc => admin.firestore().collection('players').doc(playerDoc.id)?.update(updateData)));
}
