import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseConfig from '@src/firebase/firebaseConfig';

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  console.log('foreground:', payload);
});
