import type { Toast, Modal } from '@src/types/modal';
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
export const serverbarState = atom<Modal>({
  key: 'serverbarState',
  default: {
    isOpen: false,
    transition: 'close',
  },
});
export const sideBarState = atom<Modal>({
  key: 'SideBarState',
  default: {
    isOpen: false,
    transition: 'close',
  },
});
export const profileState = atom<File | null>({
  key: 'profileState',
  default: null,
});
export const bgFileState = atom<File | null>({
  key: 'bgfileState',
  default: null,
});
export const communityFileState = atom<File | null>({
  key: 'communityfileState',
  default: null,
});
export const currentServerIdState = atom<number>({
  key: 'currentServerIdState',
  default: -1,
});
export const errorState = atom<Error | null>({
  key: 'errorState',
  default: null,
});
