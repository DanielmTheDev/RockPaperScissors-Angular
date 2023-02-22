import { GameType } from '../../room-creation/models/game-type';
import { Game } from './game';

export interface Room {
  name: string;
  numberOfPlayers: number;
  score?: number;
  typeOfGame?: GameType;
  games: Game[] | undefined;
}
