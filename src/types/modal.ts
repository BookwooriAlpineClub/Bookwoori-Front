export type Toast = {
  id: number;
  kind: 'info' | 'success' | 'error';
  content: string;
};

export type ModalTransition = 'open' | 'close';

export type Modal = {
  content?: React.ReactNode;
  isOpen: boolean;
  transition: ModalTransition;
};
