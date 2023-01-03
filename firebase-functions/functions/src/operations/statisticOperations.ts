import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { getLosers, isDraw } from './choiceOperations';
import { PlayerChoice } from '../models/player-choice';
import { Player } from '../models/player';
import { Choice } from '../models/choice';
import { Result } from '../models/result';
import { RoundStats } from '../models/round-stats';
import { collections } from '../constants/collections';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import DocumentReference = firestore.DocumentReference;

export function persistStatistics(roomId: string, players: QueryDocumentSnapshot<DocumentData>[]): Promise<DocumentReference<DocumentData>> {
  const stats = {
    roomId: roomId,
    playerChoices: getPlayerChoices(players),
    timeStamp: Date.now(),
  } as RoundStats;
  return admin.firestore().collection(collections.roundStatistics).add(stats);
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
