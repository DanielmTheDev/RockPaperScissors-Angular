import { PlayerChoice } from './player-choice';

export interface RoundStats {
  roomId: string;
  playerChoices: PlayerChoice[];
  timeStamp: number;
}
