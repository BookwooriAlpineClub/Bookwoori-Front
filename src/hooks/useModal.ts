import type { RecoilState } from 'recoil';
import type { Modal } from '@src/types/modal';
import { useSetRecoilState } from 'recoil';

const useModal = async (
  type: 'dialog' | 'bottomsheet' | 'serverbar' | 'sidebar',
) => {
  let modalState: RecoilState<Modal>;

  switch (type) {
    case 'bottomsheet': {
      const { bottomsheetState } = await import('@src/states/atoms');
      modalState = bottomsheetState;
      break;
    }
    case 'serverbar': {
      const { serverbarState } = await import('@src/states/atoms');
      modalState = serverbarState;
      break;
    }
    case 'sidebar': {
      const { sidebarState } = await import('@src/states/atoms');
      modalState = sidebarState;
      break;
    }
    case 'dialog':
    default: {
      const { dialogState } = await import('@src/states/atoms');
      modalState = dialogState;
      break;
    }
  }

  const setModal = useSetRecoilState(modalState);
  const transitionMs = 300;

  const openModal = (content?: React.ReactNode): void => {
    // 스크롤 금지
    document.body.style.overflow = 'hidden';
    // 마운트
    setModal((prev) => {
      const next = { ...prev, isOpen: true };
      if (content) next.content = content;
      return next;
    });
    setTimeout(() => {
      // 트랜지션
      setModal((prev) => {
        return { ...prev, transition: 'open' };
      });
    }, 30);
  };

  const closeModal = (): void => {
    // 트랜지션
    setModal((prev) => {
      return { ...prev, transition: 'close' };
    });
    setTimeout(() => {
      // 언마운트
      setModal((prev) => {
        return { ...prev, isOpen: false };
      });
      // 스크롤 허용
      document.body.style.overflow = '';
    }, transitionMs);
  };

  return { openModal, closeModal };
};

export default useModal;
