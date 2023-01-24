import { Game } from './game';
import { GameType } from './game-type';

export interface Room {
  typeOfGame?: GameType;
  games: Game[];
}
