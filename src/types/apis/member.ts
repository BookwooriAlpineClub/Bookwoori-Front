import { Exp, User } from '@src/types/user';

export interface ProfilePatchReq {
  nickname: 'string';
  profileImg: string | null;
  backgroundImg: string | null;
}

export type ProfileRes = User;

export type ExpRes = Exp;