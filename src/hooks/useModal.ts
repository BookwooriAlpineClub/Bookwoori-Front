import type { SetterOrUpdater } from 'recoil';

const useModal = (setModal: SetterOrUpdater<Modal>, transitionMs: number) => {
  const openModal = (content: React.ReactNode): void => {
    setModal((prev) => {
      return { ...prev, isOpen: true, content };
    });
    setTimeout(
      () =>
        setModal((prev) => {
          return { ...prev, transition: 'open' };
        }),
      30,
    );
  };

  const closeModal = (): void => {
    setModal((prev) => {
      return { ...prev, transition: 'close' };
    });
    setTimeout(
      () =>
        setModal((prev) => {
          return { ...prev, isOpen: false, content: '' };
        }),
      transitionMs,
    );
  };

  return { openModal, closeModal };
};

export default useModal;
