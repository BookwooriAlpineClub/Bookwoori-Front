import { initializeApp } from 'firebase/app';
import {
  getMessaging as getForegroundMessaging,
  onMessage as onForegroundMessaging,
} from 'firebase/messaging';
import {
  getMessaging as getBackgroundMessaging,
  onBackgroundMessage,
} from 'firebase/messaging/sw';

const firebaseConfig = {
  apiKey: 'AIzaSyDL-mXvggPAunkOYLqgWtyG93wfHFCfdn0',
  authDomain: 'bookwoori-554cd.firebaseapp.com',
  projectId: 'bookwoori-554cd',
  storageBucket: 'bookwoori-554cd.firebasestorage.app',
  messagingSenderId: '284274466098',
  appId: '1:284274466098:web:576b71a9c0b4e873c60b2b',
  measurementId: 'G-4M0DETVZC5',
};

const app = initializeApp(firebaseConfig);
const foregroundMessaging = getForegroundMessaging(app);
const backgroundMessaging = getBackgroundMessaging(app);

onForegroundMessaging(foregroundMessaging, (payload) => {
  console.log('foreground:', payload);
});

onBackgroundMessage(backgroundMessaging, (payload) => {
  console.log('background:', payload);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/public/logo_neon.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
