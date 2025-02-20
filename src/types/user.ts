import { ExpTypeType } from '@src/constants/constants';

export interface User {
  isMine: boolean;
  nickname: string;
  profileImg: string | null;
  backgroundImg: string | null;
  level: number;
  mountain: string;
  totalHeight: number;
  totalPage: number;
}

export interface Exp {
  expLogId: number;
  height: number;
  title: string;
  amount: number;
  expType: ExpTypeType;
  createdAt: string;
}
