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
declare type BadgeItem = {
  imgUrl: string;
  caption: string;
  time: string;
  message: string;
  isRead: boolean;
};

declare interface InputProps {
  title: string;
  placeholder: string;
  required: boolean;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}
