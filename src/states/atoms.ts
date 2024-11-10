import { atom } from 'recoil';

export const toastState = atom<Toast[]>({
  key: 'toastState',
  default: [],
});
export const bottomsheetState = atom<Modal>({
  key: 'bottomsheetState',
  default: {
    content: '',
    isOpen: false,
    transition: 'close',
  },
});
export const dialogState = atom<Modal>({
  key: 'dialogState',
  default: {
    content: '',
    isOpen: false,
    transition: 'close',
  },
});
export const serverListState = atom<Server[]>({
  key: 'serverListState',
  default: [],
});
export const serverbarState = atom<Omit<Serverbar, 'content'>>({
  key: 'serverbarState',
  default: {
    isOpen: false,
    transition: 'close',
  },
});
