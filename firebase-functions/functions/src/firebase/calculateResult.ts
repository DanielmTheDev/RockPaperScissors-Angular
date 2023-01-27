import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { Player } from '../models/player';
import { hasEveryoneChosen } from '../operations/choiceOperations';
import { persistRound } from '../operations/RoundOperations';
import { collections } from '../constants/collections';
import { keys } from '../constants/keys';
import { deactivatePlayers, resetPlayerChoices, walkoverAPlayer } from '../operations/playerOperations';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import DocumentData = firestore.DocumentData;

export const calculateResult = functions.firestore.document('/players/{documentId}')
  .onUpdate(async (change: any, context: any) => {
    try {
      const roomId = await getCurrentRoomId(context.params.documentId as string);
      const roomPlayers = await getRoomPlayers(roomId);
      const initiallyActivePlayers = await getActivePlayersInRoom(roomId, roomPlayers);
      const numberOfPlayersInTheRoom = roomPlayers.length;
      if (!hasEveryoneChosen(initiallyActivePlayers)) {
        return;
      }
      const isThereAForfeitPlayer = numberOfPlayersInTheRoom > 1 && initiallyActivePlayers.length === 1;
      if (isThereAForfeitPlayer) {
        await walkoverAPlayer(initiallyActivePlayers, roomId);
        await persistRound(roomId, initiallyActivePlayers);
        return;
      }
      await persistRound(roomId, initiallyActivePlayers);
      await resetPlayerChoices(initiallyActivePlayers);
      await deactivatePlayers(roomId, initiallyActivePlayers);
    } catch (e) {
      console.log(e);
    }
  });

async function getActivePlayersInRoom(roomId: string, roomPlayers: QueryDocumentSnapshot<DocumentData>[]): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  return roomPlayers.filter(playerDoc => !(playerDoc.data() as Player).isObserver);
}

async function getCurrentRoomId(playerId: string): Promise<string> {
  const currentPlayer = await admin.firestore().collection(collections.players).doc(playerId).get();
  return currentPlayer.data()?.room;
}

async function getRoomPlayers(roomId: string): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  return (await admin.firestore().collection(collections.players).where(keys.room, '==', roomId).get())
    .docs;
}
