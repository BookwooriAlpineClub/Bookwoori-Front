import type Toast from '@src/types/toast';
import type Modal from '@src/types/modal';
import { atom } from 'recoil';
import { DM } from '@src/types/messageRoom';
import { ChannelMessage } from '@src/types/channel';

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
export const sidebarState = atom<Modal>({
  key: 'sidebarState',
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
export const categoryIdState = atom<number | undefined>({
  key: 'categoryIdState',
  default: undefined,
});
export const errorState = atom<Error | null>({
  key: 'errorState',
  default: null,
});
export const editChatIdState = atom<string | null>({
  key: 'editChatIdState',
  default: null,
});
export const replyChatState = atom<
  (DM & { nickname?: string }) | (ChannelMessage & { nickname?: string }) | null
>({
  key: 'replyChatState',
  default: null,
});
export const replyChatIdState = atom<string | undefined>({
  key: 'replyChatIdState',
  default: undefined,
});
