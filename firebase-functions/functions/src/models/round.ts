import { PlayerChoice } from './player-choice';

export interface Round {
  playersChoices: PlayerChoice[];
  timeStamp: number;
}
