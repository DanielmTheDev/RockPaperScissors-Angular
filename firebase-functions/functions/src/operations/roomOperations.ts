import { GameType } from '../models/game-type';
import * as admin from 'firebase-admin';
import { collections } from '../constants/collections';
import { Room } from '../models/room';

export async function getCurrentGameType(roomId: string): Promise<GameType | undefined> {
  const room = await admin.firestore().collection(collections.rooms).doc(roomId).get();
  return (room.data() as Room).typeOfGame;
}

export async function getRoom(roomId: string): Promise<Room> {
  const roomDoc = await admin.firestore().collection(collections.rooms).doc(roomId).get();
  return roomDoc.data() as Room;
}

export async function getCurrentRoomId(playerId: string): Promise<string> {
  const currentPlayer = await admin.firestore().collection(collections.players).doc(playerId).get();
  return currentPlayer.data()?.room;
}
