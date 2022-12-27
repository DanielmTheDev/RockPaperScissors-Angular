import { Player } from './models/player';

export function hasEveryoneChosen(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return players.every(player => (player.data() as Player).choice);
}

export function getActiveLosers(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] {
  return isDraw(players)
    ? []
    : getAllLosers(players).filter(playerDoc => !(playerDoc.data() as Player).isObserver);
}

function isDraw(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return isEveryChoiceEqual(players) || isEveryChoiceDifferent(players);
}

function getAllLosers(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] {
  const allChoices = getDistinctChoices(players);
  if (allChoices.includes('Rock') && allChoices.includes('Scissors')) {
    return players.filter(player => (player.data() as Player).choice === 'Scissors');
  } else if (allChoices.includes('Rock') && allChoices.includes('Paper')) {
    return players.filter(player => (player.data() as Player).choice === 'Rock');
  } else {
    return players.filter(player => (player.data() as Player).choice === 'Paper');
  }
}

function getDistinctChoices(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): ('Rock' | 'Paper' | 'Scissors' | null | undefined)[] {
  return players
    .map(playerDoc => (playerDoc.data() as Player).choice)
    .filter((value, index, array) => array.indexOf(value) === index);
}

function isEveryChoiceEqual(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return getDistinctChoices(players).length === 1;
}

function isEveryChoiceDifferent(players: Array<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>>): boolean {
  return getDistinctChoices(players).length === 3;
}
