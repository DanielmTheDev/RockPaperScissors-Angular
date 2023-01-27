import { Choice } from './choice';
import { Result } from './result';

export interface PlayerChoice {
  playerId: string;
  choice: Choice;
  result: Result;
}
