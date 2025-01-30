import type { RecoilState } from 'recoil';
import type { Modal } from '@src/types/modal';
import { useSetRecoilState } from 'recoil';

const useModal = (modalState: RecoilState<Modal>) => {
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
