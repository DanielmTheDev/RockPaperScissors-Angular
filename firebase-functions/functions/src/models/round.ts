import { PlayerChoice } from './player-choice';

export interface Round {
  roomId: string;
  playerChoices: PlayerChoice[];
  timeStamp: number;
}
