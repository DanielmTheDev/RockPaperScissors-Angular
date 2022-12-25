const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.addResultOnRoomCreation = functions.firestore.document("/rooms/{documentId}")
    .onCreate(async (snap: any, context: any) => {
      const roomId = context.params.documentId;
      await admin.firestore().collection("results")
          .add({id: roomId, winner: "daniel as usual!"});
    });

exports.choiceUpdated = functions.firestore.document("/players/{documentId}")
    .onUpdate((change: any, context: any) => {
      const playerId = context.params.documentId;
      admin.firestore().collection("players").doc(playerId).get()
          .then((doc: any) => {
            // get the room where the player is
            const roomId = doc.data().room;
            console.log("The room in question " + roomId);

            // get all the players in the same room
            admin.firestore().collection("players").where("room", "==", roomId).get()
                .then((snapshot: any) => {
                  const playersWithChoices = [];
                  let areAllChoicesPresent = true;

                  snapshot.forEach((player: any) => {
                    if (!player.data().choices) {
                      areAllChoicesPresent = false;
                      return;
                    }
                    playersWithChoices.push(player.data());
                  });
                  console.log("should we set a result? " + areAllChoicesPresent);

                  if (areAllChoicesPresent) {
                    admin.firestore().collection("rooms").doc(roomId).update({winner: "daniel as usual!"});
                  }
                });
          });
    });

