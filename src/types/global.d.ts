declare type ModalTransition = 'open' | 'close';
declare type Modal = {
  content: React.ReactNode;
  isOpen: boolean;
  transition: ModalTransition;
};
declare type Toast = {
  id: number;
  content: string;
  kind?: 'default' | 'success' | 'error';
};
