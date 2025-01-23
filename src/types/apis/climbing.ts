import { Climbing, ClimbingMember } from '@src/types/climbing';
import { EmojiTypeType } from '@src/constants/constants';

export type postClimbingChannelReq = Pick<
  Climbing,
  'name' | 'description' | 'startDate' | 'endDate'
> & {
  serverId: number;
  isbn: string;
};

export type patchClimbingChannelReq = Pick<
  Climbing,
  'name' | 'description' | 'startDate' | 'endDate'
> & {};

export interface getClimbingInfoRes extends Climbing {}

export type getClimbingChannelMembersRes = {
  climbingMemberList: ClimbingMember[];
};

export type patchClimbingMemoReq = {
  memo: string | null;
};

export type getClimbingReviewEmojiRes = {
  reviewEmojiList: {
    emoji: EmojiTypeType;
    reviewEmojiMemberList: Pick<
      ClimbingMember,
      'memberId' | 'nickname' | 'profileImg' | 'level' | 'mountain'
    >[];
  };
};
