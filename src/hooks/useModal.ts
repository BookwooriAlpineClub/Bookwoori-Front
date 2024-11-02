import type { SetterOrUpdater } from 'recoil';

const useModal = (setModal: SetterOrUpdater<Modal>, transitionMs: number) => {
  const openModal = (content: React.ReactNode): void => {
    // 스크롤 금지
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
    `;
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
      // 스크롤 허용
      const scrollY: number = Number(document.body.style.top.slice(1, -2));
      document.body.style.cssText = '';
      window.scrollTo(0, scrollY);
    }, transitionMs);
  };

  return { openModal, closeModal };
};

export default useModal;
