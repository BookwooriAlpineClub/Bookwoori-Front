import { atom } from 'recoil';

export const bottomsheetState = atom<Modal>({
  key: 'bottomsheetState',
  default: { isOpen: false, transition: 'close', content: '' },
});
