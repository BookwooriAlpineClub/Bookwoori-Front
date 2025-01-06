import { Exp, User } from '@src/types/user';

export interface ProfilePatchRequest {
  nickname: 'string';
  profileImg: string | null;
  backgroundImg: string | null;
}

export type ProfileResponse = User;

export type ExpResponse = Exp;