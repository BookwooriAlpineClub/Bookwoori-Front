import { atom } from 'recoil';

export const dialogState = atom<Modal>({
  key: 'dialogState',
  default: {
    content: '',
    isOpen: false,
    transition: 'close',
  },
});
