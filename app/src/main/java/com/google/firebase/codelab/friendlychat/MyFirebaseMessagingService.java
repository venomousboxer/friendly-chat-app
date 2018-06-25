
package com.google.firebase.codelab.friendlychat;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String TAG = "MyFMService";
    private static final String CHANNEL_ID = "FRIENDLY_NOTIFICATION_CHANNEL";
    private static final int NOTIFICATION_ID = 1;
    private static final String NOTIFICATION_TITLE = "Friendly Chat Notification";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // Handle data payload of FCM messages.
        Log.d(TAG, "FCM Message Id: " + remoteMessage.getMessageId());
        Log.d(TAG, "FCM Notification Message: " + remoteMessage.getNotification());
        Log.d(TAG, "FCM Data Message: " + remoteMessage.getData());
        showNotifications(NOTIFICATION_TITLE, "Unread messages in chat room");
    }

    private void showNotifications(String title, String msg) {
        Intent i = new Intent(this, MainActivity.class);

        PendingIntent intent = PendingIntent.getActivity(this, 0,
                i, PendingIntent.FLAG_UPDATE_CURRENT);

        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentText(msg)
                .setContentTitle(title)
                .setContentIntent(intent)
                .setSmallIcon(R.drawable.ic_stat_name)
                .build();

        NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        if (manager != null) {
            manager.notify(NOTIFICATION_ID, notification);
        }
    }

//    public static void sendNotificationToUser(String user, final String message) {
//        Firebase ref = new Firebase();
//        final Firebase notifications = ref.child("notificationRequests");
//
//        Map notification = new HashMap<>();
//        notification.put("username", user);
//        notification.put("message", message);
//
//        notifications.push().setValue(notification);
//    }

}
