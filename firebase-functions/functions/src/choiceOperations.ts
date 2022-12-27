import { Player } from './models/player';
import { Choice } from './models/choice';

export function hasEveryoneChosen(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return players.every(player => (player.data() as Player).choice);
}

export function getLosers(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] {
  return isDraw(players)
    ? []
    : getLosersInner(players);
}

function isDraw(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return isEveryChoiceEqual(players) || isEveryChoiceDifferent(players);
}

function getLosersInner(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] {
  const allChoices = getDistinctChoices(players);
  if (allChoices.includes(Choice.Rock) && allChoices.includes(Choice.Scissors)) {
    return players.filter(player => (player.data() as Player).choice === 'Scissors');
  } else if (allChoices.includes(Choice.Rock) && allChoices.includes(Choice.Paper)) {
    return players.filter(player => (player.data() as Player).choice === 'Rock');
  } else {
    return players.filter(player => (player.data() as Player).choice === 'Paper');
  }
}

function getDistinctChoices(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): Choice[] {
  return players
    .map(playerDoc => (playerDoc.data() as Player).choice as Choice)
    .filter((value, index, array) => array.indexOf(value) === index);
}

function isEveryChoiceEqual(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return getDistinctChoices(players).length === 1;
}

function isEveryChoiceDifferent(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return getDistinctChoices(players).length === 3;
}
