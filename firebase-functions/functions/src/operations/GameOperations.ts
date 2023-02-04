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
import { getRoom } from './roomOperations';

export async function getCurrentGame(roomId: string, players: QueryDocumentSnapshot<DocumentData>[]): Promise<Game> {
  const round = {
    playersChoices: getPlayersChoices(players),
    timeStamp: Date.now(),
  } as Round;

  const room = await getRoom(roomId);
  const games = room.games ?? [];
  const isItANewGame = !games[games.length - 1]?.lastOneActive;

  if (isItANewGame) {
    games.push(createNewGame(round));
  } else {
    games[games.length - 1].rounds.push(round);
  }
  await admin.firestore().collection(collections.rooms).doc(roomId).update({ games });
  return games[games.length - 1];
}

export async function addLastOneActiveToGame(lastOneActive: string, roomId: string): Promise<void> {
  const games = (await getRoom(roomId)).games;
  if (games) {
    games[games.length - 1].lastOneActive = lastOneActive;
    await admin.firestore().collection(collections.rooms).doc(roomId).update({ games });
  }
}

function getPlayersChoices(players: QueryDocumentSnapshot<DocumentData>[]): PlayerChoice[] {
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

function createNewGame(round: Round): Game {
  return {
    rounds: [round],
  } as Game;
}
