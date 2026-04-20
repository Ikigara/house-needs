// firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBSBa4RCxQobRMzQ67boTTqHTCIgKRJ8fY',
  authDomain: 'house-needs-a7f74.firebaseapp.com',
  projectId: 'house-needs-a7f74',
  storageBucket: 'house-needs-a7f74.firebasestorage.app',
  messagingSenderId: '628622540148',
  appId: '1:628622540148:web:66a94faaff30d7f6a40021',
  measurementId: 'G-NGJPWT86XP',
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// get browser token
export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey:
        'BJYOg0O6pilOCqUVO4I9mmzdGI39Y93ZiIxCBc4RagTxyIhnZbINbdBoO3FmxCN3krbIZIE-PP5G-iH2PeLNviE',
    });

    console.log('FCM Token:', token);
    return token;
  } else {
    console.log('Permission denied');
  }
};
