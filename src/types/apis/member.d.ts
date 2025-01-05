import { Exp, User } from '@src/types/user.d';

export interface ProfilePatchRequest {
  nickname: 'string';
  profileImg: string | null;
  backgroundImg: string | null;
}

export type ProfileResponse = User;

export type ExpResponse = Exp;