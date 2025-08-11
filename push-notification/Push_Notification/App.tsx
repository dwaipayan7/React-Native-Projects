import { StyleSheet, View, Button, Alert } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    requestUserPermission();
    getFcmToken();

    //In-app notification
    inAppMessaging().setMessagesDisplaySuppressed(false);

    // Foreground FCM message listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground FCM Message:', remoteMessage);

        Alert.alert(
      remoteMessage.notification?.title || 'In-App Message',
      remoteMessage.notification?.body || ''
    );

      // Show notification using Notifee
      await displayNotifeeNotification(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || ''
      );
    });

    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission enabled');
    }
  }

  async function getFcmToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        setToken(fcmToken);
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  }

  async function displayNotifeeNotification(title, body) {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
      },
    });
  }

  async function onDisplayNotification() {
    await displayNotifeeNotification(
      'Notification Title',
      'Main body content of the notification'
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Display Local Notification" onPress={onDisplayNotification} />
      <Button
        title="Show FCM Token"
        onPress={() => Alert.alert('Your FCM Token', token || 'No token yet')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
