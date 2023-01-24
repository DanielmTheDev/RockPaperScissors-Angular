import { Round } from "./round";

export interface Game {
  rounds: Round[];
  lastOneActive: string;
}
