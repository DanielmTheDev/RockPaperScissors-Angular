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
import { addLastOneActiveToGame } from './GameOperations';

export async function deactivatePlayers(roomId: string, game: Game, initiallyActivePlayers: QueryDocumentSnapshot<DocumentData>[]): Promise<void> {
  const playersToDeactivate = await getPlayersToDeactivate(game, roomId);
  if (!playersToDeactivate.length) {
    return;
  }
  await updatePlayers(playersToDeactivate, { isObserver: true });
  await determineLastOneActive(initiallyActivePlayers, playersToDeactivate, roomId);
}

export async function getActivePlayersInRoom(roomId: string): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  return (await admin.firestore().collection(collections.players).where('room', '==', roomId).get())
    .docs.filter(playerDoc => !(playerDoc.data() as Player).isObserver);
}

export async function resetPlayerChoices(players: QueryDocumentSnapshot<DocumentData>[]): Promise<void> {
  await updatePlayersDoc(players, { choice: null });
}

async function determineLastOneActive(initiallyActivePlayers: QueryDocumentSnapshot<DocumentData>[], playersToDeactivate: string[], roomId: string): Promise<void> {
  if (initiallyActivePlayers.length === playersToDeactivate.length + 1) {
    const lastOneActive = initiallyActivePlayers.find(player => !playersToDeactivate.includes(player.id));
    if (lastOneActive) {
      await addLastOneActiveToGame(lastOneActive.id, roomId);
      await updatePlayers([lastOneActive?.id], { isObserver: true });
    }
  }
}

export async function getPlayersToDeactivate(game: Game, roomId: string): Promise<string[]> {
  const gameType = await getCurrentGameType(roomId);
  const playersChoicesInLastRound = game.rounds[game.rounds.length - 1].playersChoices;
  return playersChoicesInLastRound.find(player => player.result === Result.Draw)
    ? []
    : gameType == GameType.Loser
      ? playersChoicesInLastRound.filter(player => player.result === Result.Won).map(player => player.playerId)
      : playersChoicesInLastRound.filter(player => player.result === Result.Lost).map(player => player.playerId);
}

function updatePlayers(players: string[], updateData: Player): Promise<Awaited<FirebaseFirestore.WriteResult | undefined>[]> {
  return Promise.all(players.map(playerId => admin.firestore().collection(collections.players).doc(playerId)?.update(updateData)));
}

function updatePlayersDoc(players: QueryDocumentSnapshot<DocumentData>[], updateData: Player): Promise<Awaited<FirebaseFirestore.WriteResult | undefined>[]> {
  return Promise.all(players.map(playerDoc => admin.firestore().collection(collections.players).doc(playerDoc.id)?.update(updateData)));
}
