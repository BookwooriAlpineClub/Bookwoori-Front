export default interface Modal {
  content?: React.ReactNode;
  isOpen: boolean;
  transition: 'open' | 'close';
}
