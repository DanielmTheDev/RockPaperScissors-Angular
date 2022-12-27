import { Player } from './models/player';

export function hasEveryoneChosen(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return players.every(player => (player.data() as Player).choice);
}

export function calculateLosers(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): string[] {
  if (isDraw(players)) {
    return [];
  }
  // this is just to show something. soon, all the losers will be calculated and returned here instead
  return [players[0].id];
}

function isDraw(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return isEveryChoiceEqual(players) || isEveryChoiceDifferent(players);
}

export function getDistinctChoices(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): string[] {
  return players
    .map(playerDoc => (playerDoc.data() as Player).choice)
    .filter((value, index, array) => array.indexOf(value) === index);
}

function isEveryChoiceEqual(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return players.every(player => (player.data() as Player).choice === (players[0].data() as Player).choice);
}

function isEveryChoiceDifferent(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return getDistinctChoices(players)
    .length === 3;
}
