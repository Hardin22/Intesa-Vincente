const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteOldGames = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
    const now = Date.now();
    const thirtyMinutesAgo = now - 30 * 60 * 1000;

    const snapshot = await admin.database().ref('/games').orderByChild('startTime').endAt(thirtyMinutesAgo).once('value');

    const updates = {};
    snapshot.forEach(child => {
        updates[child.key] = null;
    });

    return admin.database().ref('/games').update(updates);
});