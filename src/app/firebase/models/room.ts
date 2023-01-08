import { GameType } from '../../room-creation/models/game-type';

export interface Room {
  name: string;
  numberOfPlayers: number;
  score?: number;
  typeOfGame?: GameType;
  lastOneActive: string;
}
