export interface User {
  isMine: boolean;
  nickname: string;
  profileImg: string | null;
  backgroundImg: string | null;
  level: number;
  mountain: string;
  height: number;
  totalPage: number;
}

export interface Exp {
  reason: string;
  amount: number;
  exp: number;
  type: string;
  createdAt: string;
}