import { Round } from "./round";

export interface Game {
  roomId: string;
  rounds: Round[]
}
