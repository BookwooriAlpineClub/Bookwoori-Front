import { atom } from 'recoil';

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
export const toastState = atom<Toast[]>({
  key: 'toastState',
  default: [],
});
export const profileState = atom<File | null>({
  key: 'fileState',
  default: null,
});
export const bgFileState = atom<File | null>({
  key: 'fileState',
  default: null,
});
