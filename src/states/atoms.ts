import { atom } from 'recoil';
import { Toast } from '../types/global.d';

export const toastState = atom<Toast[]>({
  key: 'toastState',
  default: [],
});
