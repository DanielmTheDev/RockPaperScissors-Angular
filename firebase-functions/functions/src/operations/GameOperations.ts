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
import { Room } from '../models/room';
import { GameType } from '../models/game-type';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export async function addRoundToGame(roomId: string, players: QueryDocumentSnapshot<DocumentData>[]): Promise<void> {
  const round = {
    playerChoices: getPlayerChoices(players),
    timeStamp: Date.now(),
  } as Round;

  const room = await getRoom(roomId);
  const games = room.games ?? [];
  const currentGameIndex = games?.findIndex(game => !game.lastOneActive);

  if (currentGameIndex > -1) {
    games[currentGameIndex].rounds.push(round);
  } else {
    games.push(createNewGame(round, room.typeOfGame));
  }
  await admin.firestore().collection(collections.rooms).doc(roomId).update({ games });
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

async function getRoom(roomId: string): Promise<Room> {
  const roomDoc = await admin.firestore().collection(collections.rooms).doc(roomId).get();
  return roomDoc.data() as Room;
}

function findLastOneActive(playerChoices: PlayerChoice[], typeOfGame?: GameType): string | undefined {
  return playerChoices.find(player => player.result === Result.Draw)
    ? undefined
    : typeOfGame === GameType.Loser
      ? playerChoices.find(player => player.result === Result.Lost)?.playerId
      : playerChoices.find(player => player.result === Result.Won)?.playerId;
}

function createNewGame(round: Round, typeOfGame?: GameType): Game {
  const lastOneActive = findLastOneActive(round.playerChoices, typeOfGame);
  return {
    rounds: [round],
    lastOneActive: lastOneActive,
  } as Game;
}
