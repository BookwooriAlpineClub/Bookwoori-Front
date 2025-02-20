import { RoleTypeType } from '@src/constants/constants';

export type Server = {
  name: string;
  serverImg: string | null;
  ownerNickname: string;
  memberCount: number;
  createdAt: string;
  description: string;
};

export type ServerMember = {
  memberId: number;
  nickname: string;
  profileImg: string | null;
  level: number;
  mountain: string;
  role: RoleTypeType;
};
