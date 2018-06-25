const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.sendFollowersNotification = functions
.database.ref('/messages').onWrite(event => {
    const payload = {
        notification : {
            title : "Unread messages",
            body : "New messages in the lobby"
        },
        topic : 'news'
    }
    return admin
        .database()
        .ref('/messages')
        .once('value')
        .then(data => {
            console.log("Sending Notification to all devices")
            return admin.messaging().send(payload);
        });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// exports.sendNotification = functions.database
//     .ref("/message/{userId}/{pushId}")
//     .onWrite(event => {
//         const snapshot = event.data;
//         const userId = event.params.userId;
//         if (snapshot.previous.val()) {
//             return;
//         }
//         if (snapshot.val().name != "ADMIN") {
//             return;
//         }
//         const text = snapshot.val().text;
//         const payload = {
//             notification: {
//                 title: `New message by ${snapshot.val().name}`,
//                 body: text
//                     ? text.length <= 100 ? text : text.substring(0, 97) + "..."
//                     : ""
//             }
//         };
//         return admin
//             .database()
//             .ref(`data/${userId}/customerData`)
//             .once('value')
//             .then(data => {
//                 console.log('inside', data.val().notificationKey);
//                 if (data.val().notificationKey) {
//                     return admin.messaging().sendToDevice(data.val().notificationKey, payload);
//                 }
//             });
//     });