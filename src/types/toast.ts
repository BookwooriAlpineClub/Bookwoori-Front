export default interface Toast {
  id: number;
  kind: 'info' | 'success' | 'error';
  content: string;
}
