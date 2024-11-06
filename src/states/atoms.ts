import { atom } from 'recoil';

export const dialogState = atom<Modal>({
  key: 'dialogState',
  default: {
    content: '',
    isOpen: false,
    transition: 'close',
  },
});
export const toastState = atom<Toast[]>({
  key: 'toastState',
  default: [],
});
