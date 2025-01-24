import { Exp, User } from '@src/types/user';

export interface ProfilePatchReq {
  nickname: 'string';
  profileImg: File | null;
  backgroundImg: File | null;
}

export type ProfileRes = User;

export type ExpRes = Exp;