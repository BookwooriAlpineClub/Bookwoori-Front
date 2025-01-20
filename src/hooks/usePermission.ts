import { getToken } from 'firebase/messaging';
import { messaging } from '@src/firebase';

const usePermission = () => {
  const requestNotification = async () => {
    try {
      const permission = await Notification.requestPermission();
      switch (permission) {
        case 'granted': { // 권한 부여
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
          });
          return currentToken;
        }
        case 'denied': // 권한 거부
        case 'default': // 권한 요청 무시
        default:
          throw new Error('알림 권한을 허용해 주세요.');
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('알 수 없는 오류가 발생했어요.');
    }
  };

  return requestNotification;
};

export default usePermission;
