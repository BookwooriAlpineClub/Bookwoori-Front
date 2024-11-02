import { useSetRecoilState } from 'recoil';
import { toastState } from '@src/states/atoms';

const useToast = () => {
  const setToasts = useSetRecoilState(toastState);

  const addToast = ({
    content,
    category = 'default',
  }: Omit<Toast, 'id'>): void => {
    const newToast: Toast = { id: Date.now(), content, category };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => removeToast(newToast.id), 4500);
  };

  const removeToast = (id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return addToast;
};

export default useToast;
