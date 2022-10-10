import { GameType } from "./game-type";

export interface RoomCreationRequest {
  name: string;
  numberOfPlayers: number;
  iterations?: number;
  typeOfGame?: GameType;
}
