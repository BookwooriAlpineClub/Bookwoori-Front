declare type ModalTransition = 'open' | 'close';

declare type Modal = {
  isOpen: boolean;
  transition: ModalTransition;
  content: React.ReactNode;
};
