declare type ModalTransition = 'open' | 'close';

declare type Modal = {
  content: React.ReactNode;
  isOpen: boolean;
  transition: ModalTransition;
};
