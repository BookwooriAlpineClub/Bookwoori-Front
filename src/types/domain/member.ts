export interface ProfileResponse {
  isMine: boolean;
  nickname: string;
  profileImg: string | null;
  backgroundImg: string | null;
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

export interface ServerMember {
  memberId: number;
  nickname: string;
  profileImg: string | null;
  level: number;
  mountain: string;
  role: 'OWNER' | 'MEMBER';
}
