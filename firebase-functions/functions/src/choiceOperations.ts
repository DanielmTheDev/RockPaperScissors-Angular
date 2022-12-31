import { Player } from './models/player';
import { Choice } from './models/choice';
import { firestore } from 'firebase-admin';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import DocumentData = firestore.DocumentData;

export function hasEveryoneChosen(players: QueryDocumentSnapshot<DocumentData>[]): boolean {
  return players.every(player => (player.data() as Player).choice);
}

export function getLosers(players: QueryDocumentSnapshot<DocumentData>[]): QueryDocumentSnapshot<DocumentData>[] {
  return isDraw(players)
    ? []
    : getLosersInner(players);
}

function isDraw(players: QueryDocumentSnapshot<DocumentData>[]): boolean {
  return isEveryChoiceEqual(players) || isEveryChoiceDifferent(players);
}

function getLosersInner(players: QueryDocumentSnapshot<DocumentData>[]): QueryDocumentSnapshot<DocumentData>[] {
  const allChoices = getDistinctChoices(players);
  if (allChoices.includes(Choice.Rock) && allChoices.includes(Choice.Scissors)) {
    return players.filter(player => (player.data() as Player).choice === 'Scissors');
  } else if (allChoices.includes(Choice.Rock) && allChoices.includes(Choice.Paper)) {
    return players.filter(player => (player.data() as Player).choice === 'Rock');
  } else {
    return players.filter(player => (player.data() as Player).choice === 'Paper');
  }
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
