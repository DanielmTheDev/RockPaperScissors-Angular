import { Choice } from './choice';

export interface Player {
  choice?: Choice | null,
  isObserver?: boolean;
}

