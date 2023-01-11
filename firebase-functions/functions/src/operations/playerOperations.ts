import { getPlayersToDeactivate } from './choiceOperations';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { collections } from '../constants/collections';
import { Player } from '../models/player';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export async function deactivatePlayers(roomId: string, initiallyActivePlayers: QueryDocumentSnapshot<DocumentData>[]): Promise<void> {
  const playersToDeactivate = await getPlayersToDeactivate(initiallyActivePlayers, roomId);
  if (!playersToDeactivate.length) {
    return;
  }
  await updatePlayers(playersToDeactivate, { isObserver: true });
  await determineLastOneActive(initiallyActivePlayers, playersToDeactivate, roomId);
}

export async function resetPlayerChoices(players: QueryDocumentSnapshot<DocumentData>[]): Promise<void> {
  await updatePlayers(players, { choice: null });
}

async function determineLastOneActive(initiallyActivePlayers: QueryDocumentSnapshot<DocumentData>[], playersToDeactivate: QueryDocumentSnapshot<DocumentData>[], roomId: string): Promise<void> {
  const stillActivePlayers = initiallyActivePlayers.filter(player => !playersToDeactivate.includes(player));
  if (stillActivePlayers.length === 1) {
    await admin.firestore().collection(collections.rooms).doc(roomId).update({ lastOneActive: stillActivePlayers[0].id });
    await updatePlayers(stillActivePlayers, { isObserver: true });
  }
}

function updatePlayers(players: QueryDocumentSnapshot<DocumentData>[], updateData: Player): Promise<Awaited<FirebaseFirestore.WriteResult | undefined>[]> {
  return Promise.all(players.map(playerDoc => admin.firestore().collection(collections.players).doc(playerDoc.id)?.update(updateData)));
}
