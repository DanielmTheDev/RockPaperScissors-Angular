import { Player } from '../models/player';
import { Choice } from '../models/choice';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { GameType } from '../models/game-type';
import { Room } from '../models/room';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import DocumentData = firestore.DocumentData;
import { collections } from '../constants/collections';

export function hasEveryoneChosen(players: QueryDocumentSnapshot<DocumentData>[]): boolean {
  return Boolean(players.length) && players.every(player => (player.data() as Player).choice);
}

export async function getPlayersToDeactivate(players: QueryDocumentSnapshot<DocumentData>[], roomId: string): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  const gameType = await getCurrentGameType(roomId);
  return isDraw(players)
    ? []
    : gameType == GameType.Loser
      ? getWinners(players)
      : getLosers(players);
}

export function getLosers(players: QueryDocumentSnapshot<DocumentData>[]): QueryDocumentSnapshot<DocumentData>[] {
  const allChoices = getDistinctChoices(players);
  if (allChoices.includes(Choice.Rock) && allChoices.includes(Choice.Scissors)) {
    return players.filter(player => (player.data() as Player).choice === 'Scissors');
  } else if (allChoices.includes(Choice.Rock) && allChoices.includes(Choice.Paper)) {
    return players.filter(player => (player.data() as Player).choice === 'Rock');
  } else {
    return players.filter(player => (player.data() as Player).choice === 'Paper');
  }
}

export function isDraw(players: QueryDocumentSnapshot<DocumentData>[]): boolean {
  return isEveryChoiceEqual(players) || isEveryChoiceDifferent(players);
}

function getWinners(players: QueryDocumentSnapshot<DocumentData>[]): QueryDocumentSnapshot<DocumentData>[] {
  const losers = getLosers(players);
  return players.filter(player => !losers.includes(player));
}

function getDistinctChoices(players: QueryDocumentSnapshot<DocumentData>[]): Choice[] {
  return players
    .map(playerDoc => (playerDoc.data() as Player).choice as Choice)
    .filter((value, index, array) => array.indexOf(value) === index);
}

function isEveryChoiceEqual(players: QueryDocumentSnapshot<DocumentData>[]): boolean {
  return getDistinctChoices(players).length === 1;
}

function isEveryChoiceDifferent(players: QueryDocumentSnapshot<DocumentData>[]): boolean {
  return getDistinctChoices(players).length === 3;
}

async function getCurrentGameType(roomId: string): Promise<GameType | undefined> {
  const room = await admin.firestore().collection(collections.rooms).doc(roomId).get();
  return (room.data() as Room).typeOfGame;
}
