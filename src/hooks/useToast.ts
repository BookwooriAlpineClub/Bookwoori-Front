import type Toast from '@src/types/toast';
import { useSetRecoilState } from 'recoil';
import { toastState } from '@src/states/atoms';

const useToast = () => {
  const setToasts = useSetRecoilState(toastState);

  const addToast = (kind: Toast['kind'], content: Toast['content']): void => {
    const newToast: Toast = { id: Date.now(), kind, content };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => removeToast(newToast.id), 2600);
  };

  const removeToast = (id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return addToast;
};

export default useToast;
