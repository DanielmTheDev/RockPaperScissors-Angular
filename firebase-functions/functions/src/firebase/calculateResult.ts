import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { hasEveryoneChosen } from '../operations/choiceOperations';
import { deactivatePlayers, getActivePlayersInRoom, resetPlayerChoices } from '../operations/playerOperations';
import { getCurrentRoomId } from '../operations/roomOperations';
import { addRoundToGame } from '../operations/gameOperations';

admin.firestore().settings({ ignoreUndefinedProperties: true });

export const calculateResult = functions.region('europe-west1').firestore.document('/players/{documentId}')
  .onUpdate(async (change: any, context: any) => {
    try {
      const roomId = await getCurrentRoomId(context.params.documentId as string);
      const initiallyActivePlayers = await getActivePlayersInRoom(roomId);
      if (!hasEveryoneChosen(initiallyActivePlayers)) {
        return;
      }
      const currentGame = await addRoundToGame(roomId, initiallyActivePlayers);
      await resetPlayerChoices(initiallyActivePlayers);
      await deactivatePlayers(roomId, currentGame, initiallyActivePlayers);
    } catch (e) {
      console.log(e);
    }
  });
