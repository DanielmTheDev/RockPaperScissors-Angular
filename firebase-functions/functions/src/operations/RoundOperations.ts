import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { getLosers, isDraw } from './choiceOperations';
import { PlayerChoice } from '../models/player-choice';
import { Player } from '../models/player';
import { Choice } from '../models/choice';
import { Result } from '../models/result';
import { Round } from '../models/round';
import { Game } from '../models/game';
import { collections } from '../constants/collections';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export async function persistRound(roomId: string, players: QueryDocumentSnapshot<DocumentData>[]): Promise<void> {
  const round = {
    playerChoices: getPlayerChoices(players),
    timeStamp: Date.now(),
  } as Round;

  const currentGame = await getGame(roomId);
  if (currentGame) {
    const rounds = currentGame.data().rounds.concat(round);
    await admin.firestore().collection(collections.games).doc(currentGame.id)?.update({ rounds })
  } else {
    const game = {
      roomId: roomId,
      rounds: [round]
    } as Game
    await admin.firestore().collection(collections.games).add(game);
  }
}

function getPlayerChoices(players: QueryDocumentSnapshot<DocumentData>[]): PlayerChoice[] {
  return players.map(player => ({
    playerId: player.id,
    choice: (player.data() as Player).choice as Choice,
    result: getResult(player, players),
  }) as PlayerChoice);
}

function getResult(player: QueryDocumentSnapshot<DocumentData>, allPlayers: QueryDocumentSnapshot<DocumentData>[]): Result {
  return isDraw(allPlayers)
    ? Result.Draw
    : getLosers(allPlayers).includes(player)
      ? Result.Lost
      : Result.Won;
}

async function getGame(roomId: string): Promise<QueryDocumentSnapshot<DocumentData> | undefined> {
  const gameDocs = (await admin.firestore().collection(collections.games).where('roomId', '==', roomId).get()).docs;
  return gameDocs && gameDocs.length > 0 ? gameDocs[0] : undefined;
}
