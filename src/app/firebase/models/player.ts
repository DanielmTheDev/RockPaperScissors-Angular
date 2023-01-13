import { Choice } from '../../choice/models/choice';

export interface Player {
  id: string;
  name: string;
  room: string;
  avatar: string;
  choice: Choice | null;
  isObserver: boolean;
}