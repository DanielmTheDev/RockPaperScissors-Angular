import { Choice } from '../../choice/models/choice';

export interface PlayerInRoom {
  id: string;
  playerId: string;
  roomId: string;
  isActive: boolean;
  choiceForCurrentRound?: Choice;
}