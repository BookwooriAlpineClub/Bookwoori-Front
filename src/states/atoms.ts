import { atom } from 'recoil';

export const dialogState = atom<Modal>({
  key: 'dialogState',
  default: { isOpen: false, transition: 'close', content: '' },
});
