import { selector } from 'recoil';
import { serverListState, serverbarState } from '@src/states/atoms';

export const serverbarSelector = selector<Serverbar>({
  key: 'serverbarSelector',
  get: ({ get }) => {
    const content = get(serverListState);
    const { isOpen, transition } = get(serverbarState);
    return { content, isOpen, transition };
  },
});

export const abc = {};
