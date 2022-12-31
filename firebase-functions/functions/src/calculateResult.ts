import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Player } from './models/player';
import { getLosers, hasEveryoneChosen } from './choiceOperations';
import { Room } from './models/room';
import { GameType } from './models/game-type';

async function getCurrentGameType(roomId: string): Promise<GameType | undefined> {
  const room = await admin.firestore().collection('rooms').doc(roomId).get();
  console.log(JSON.stringify(room.data()));
  return (room.data() as Room).typeOfGame;
}

export const calculateResult = functions.firestore.document('/players/{documentId}')
  .onUpdate(async (change: any, context: any) => {
    try {
      const roomId = await getCurrentRoomId(context.params.documentId as string);
      await getCurrentGameType(roomId);
      const playersInCurrentRoom = await getActivePlayersInRoom(roomId);
      if (!hasEveryoneChosen(playersInCurrentRoom)) {
        return;
      }
      await updatePlayers(playersInCurrentRoom, { choice: null });
      const losers = getLosers(playersInCurrentRoom);
      if (!losers.length) {
        return;
      }
      await updatePlayers(losers, { isObserver: true });
      await determineWinner(playersInCurrentRoom, losers, roomId);
    } catch (e) {
      console.log(e);
    }
  });

async function determineWinner(
  playersInSameRoom: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[],
  losers: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[],
  roomId: string): Promise<void> {
  const winners = playersInSameRoom.filter(player => !losers.includes(player));
  if (winners.length === 1) {
    await admin.firestore().collection('rooms').doc(roomId).update({ winner: winners[0].id });
    await updatePlayers(winners, { isObserver: true });
  }
}

async function getActivePlayersInRoom(roomId: string): Promise<FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]> {
  return (await admin.firestore().collection('players').where('room', '==', roomId).get())
    .docs.filter(playerDoc => !(playerDoc.data() as Player).isObserver);
}

async function getCurrentRoomId(playerId: string): Promise<string> {
  const currentPlayer = await admin.firestore().collection('players').doc(playerId).get();
  return currentPlayer.data()?.room;
}

function updatePlayers(players: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[], updateData: Player): Promise<Awaited<FirebaseFirestore.WriteResult | undefined>[]> {
  return Promise.all(players.map(playerDoc => admin.firestore().collection('players').doc(playerDoc.id)?.update(updateData)));
}
