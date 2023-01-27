import { PlayerChoice } from './player-choice';

export interface Round {
  playerChoices: PlayerChoice[];
  timeStamp: number;
}
