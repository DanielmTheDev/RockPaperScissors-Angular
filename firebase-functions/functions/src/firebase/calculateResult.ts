import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { hasEveryoneChosen } from '../operations/choiceOperations';
import { deactivatePlayers, getActivePlayersInRoom, resetPlayerChoices } from '../operations/playerOperations';
import { getCurrentRoomId } from '../operations/roomOperations';
import { getCurrentGame } from '../operations/GameOperations';

admin.firestore().settings({ ignoreUndefinedProperties: true });

export const calculateResult = functions.firestore.document('/players/{documentId}')
  .onUpdate(async (change: any, context: any) => {
    try {
      const roomId = await getCurrentRoomId(context.params.documentId as string);
      const initiallyActivePlayers = await getActivePlayersInRoom(roomId);
      if (!hasEveryoneChosen(initiallyActivePlayers)) {
        return;
      }
      const currentGame = await getCurrentGame(roomId, initiallyActivePlayers);
      await resetPlayerChoices(initiallyActivePlayers);
      await deactivatePlayers(roomId, currentGame, initiallyActivePlayers);
    } catch (e) {
      console.log(e);
    }
  });
