export interface ProfileResponse {
  isMine: boolean;
  nickname: string;
  profileImg: string | null;
  level: number;
  mountain: string;
  height: number;
  totalPage: number;
}

export interface ExpResponse {
  reason: string;
  amount: number;
  exp: number;
  type: string;
  createdAt: string;
}
