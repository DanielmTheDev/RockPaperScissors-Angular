import { GameType } from "./game-type";

export interface RoomCreationRequest {
  name: string;
  numberOfPlayers: number;
  score?: number;
  typeOfGame?: GameType;
}
