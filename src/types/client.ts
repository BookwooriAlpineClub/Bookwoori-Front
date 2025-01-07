export type Toast = {
  id: number;
  content: string;
  kind?: 'default' | 'success' | 'error';
};
export type ModalTransition = 'open' | 'close';
export type Modal = {
  content: React.ReactNode;
  isOpen: boolean;
  transition: ModalTransition;
};

export interface InputProps {
  title: string;
  placeholder: string;
  required: boolean;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

interface SideBar {
  isOpen: boolean;
  transition: ModalTransition;
}
