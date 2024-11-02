import type { SetterOrUpdater } from 'recoil';

const useModal = (setModal: SetterOrUpdater<Modal>, transitionMs: number) => {
  const openModal = (content: React.ReactNode): void => {
    // 마운트
    setModal((prev) => {
      return { ...prev, content, isOpen: true };
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
        return { ...prev, content: '', isOpen: false };
      });
    }, transitionMs);
  };

  return { openModal, closeModal };
};

export default useModal;
