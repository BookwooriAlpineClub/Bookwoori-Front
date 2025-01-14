import Device from '@src/types/device';
import { getToken } from 'firebase/messaging';
import { messaging } from '@src/firebase';

interface Props {
  onSuccess: (currentToken: Device['token']) => void;
  onDenied: () => void;
  onError: (error: Error) => void;
}

const usePermission = ({ onSuccess, onDenied, onError }: Props) => {
  const requestNotification = async () => {
    try {
      const permission = await Notification.requestPermission();
      switch (permission) {
        case 'granted': {
          // 권한 부여
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
          });
          onSuccess(currentToken);
          break;
        }
        case 'denied': // 권한 거부
        case 'default': // 권한 요청 무시
        default:
          onDenied();
      }
    } catch (error) {
      onError(error as Error);
    }
  };

  return requestNotification;
};

export default usePermission;
