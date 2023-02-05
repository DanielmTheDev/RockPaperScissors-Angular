import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { collections } from '../constants/collections';
import { Player } from '../models/player';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import { Game } from '../models/game';
import { GameType } from '../models/game-type';
import { Result } from '../models/result';
import { getCurrentGameType } from './roomOperations';
import { setLastOneActiveInGame } from './gameOperations';

export async function deactivatePlayers(roomId: string, game: Game, initiallyActivePlayers: QueryDocumentSnapshot<DocumentData>[]): Promise<void> {
  const playerIdsToDeactivate = await getPlayerIdsToDeactivate(game, roomId);
  if (!playerIdsToDeactivate.length) {
    return;
  }
  await updatePlayers(playerIdsToDeactivate, { isObserver: true });
  await determineLastOneActive(initiallyActivePlayers, playerIdsToDeactivate, roomId);
}

export async function getActivePlayersInRoom(roomId: string): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  return (await admin.firestore().collection(collections.players).where('room', '==', roomId).get())
    .docs.filter(playerDoc => !(playerDoc.data() as Player).isObserver);
}

export async function resetPlayerChoices(players: QueryDocumentSnapshot<DocumentData>[]): Promise<void> {
  await updatePlayersDoc(players, { choice: null });
}

async function determineLastOneActive(initiallyActivePlayers: QueryDocumentSnapshot<DocumentData>[], playerIdsToDeactivate: string[], roomId: string): Promise<void> {
  const isOnlyOneActivePlayerLeft = initiallyActivePlayers.length === playerIdsToDeactivate.length + 1;
  if (isOnlyOneActivePlayerLeft) {
    const lastOneActive = initiallyActivePlayers.find(player => !playerIdsToDeactivate.includes(player.id));
    await setLastOneActiveInGame(lastOneActive?.id, roomId);
    await updatePlayers([lastOneActive?.id], { isObserver: true });
  }
}

export async function getPlayerIdsToDeactivate(game: Game, roomId: string): Promise<string[]> {
  const gameType = await getCurrentGameType(roomId);
  const playersChoicesInLastRound = game.rounds[game.rounds.length - 1].playersChoices;
  return playersChoicesInLastRound.find(player => player.result === Result.Draw)
    ? []
    : gameType == GameType.Loser
      ? playersChoicesInLastRound.filter(player => player.result === Result.Won).map(player => player.playerId)
      : playersChoicesInLastRound.filter(player => player.result === Result.Lost).map(player => player.playerId);
}

function updatePlayers(playerIds: (string | undefined)[], updateData: Player): Promise<Awaited<FirebaseFirestore.WriteResult | undefined>[]> {
  return Promise.all(playerIds
    .map(playerId => playerId ? admin.firestore().collection(collections.players).doc(playerId)?.update(updateData) : undefined));
}

function updatePlayersDoc(players: QueryDocumentSnapshot<DocumentData>[], updateData: Player): Promise<Awaited<FirebaseFirestore.WriteResult | undefined>[]> {
  return Promise.all(players.map(playerDoc => admin.firestore().collection(collections.players).doc(playerDoc.id)?.update(updateData)));
}
