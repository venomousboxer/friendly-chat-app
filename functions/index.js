const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// var timeStamp = Date.now();
// var bookingTimeStamp = timeStamp;
// var folderTimeStamp = (bookingTimeStamp/1000000)|0;
// console.log('booking : ' + bookingTimeStamp);
// console.log('folder : ' + folderTimeStamp);

exports.sendMerchantNotificationsOnBooking = functions
.database.ref('/MERCHANT/{salonName}/{folderTimeStamp}').onCreate((change, context) => {
    const salonName = context.params.salonName;
    const payload = {
        notification : {
            title : "New Booking",
            body : "New booking in zalonin"
        }
    }
    return admin
        .database()
        .ref('/MERCHANT/' + salonName)
        .once('value')
        .then(data => {
            console.log("Sending Notification to Merchant with saloon name : " + salonName);
            if(data.val()){
                return admin.messaging().sendToDevice(data.val().FCM_TOKEN, payload);
            }
            else{
                console.log('unable to create snapshot of data');
                return null;
            }
        });
});
exports.stopSendingNotificationOnRejectionOfBooking = functions
    .database.ref('/MERCHANT/{salonName}/{folderTimeStamp}').onDelete((change, context) => {
        if(intervalId !== null){
            clearInterval(intervalId);
        }
    });
var intervalId = setInterval(sendNotificationAtRegularIntervals, 15000);
function sendNotificationAtRegularIntervals() {
    admin
        .database()
        .ref('/MERCHANT/' + salonName)
        .once('value')
        .then(data => {
            console.log("Sending Notification to Merchant with saloon name : " + salonName);
            if (data.val()) {
                return admin.messaging().sendToDevice(data.val().FCM_TOKEN, payload);
            }
            else {
                console.log('unable to create snapshot of data');
                return null;
            }
        }).catch(console.error());
}
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


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