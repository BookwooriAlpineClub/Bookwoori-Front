declare type Toast = {
  id: number;
  content: string;
  kind?: 'default' | 'success' | 'error';
};
