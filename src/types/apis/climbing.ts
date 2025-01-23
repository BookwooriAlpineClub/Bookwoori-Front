import { Climbing, ClimbingMember } from '@src/types/climbing';
import { EmojiTypeType } from '@src/constants/constants';

export type patchClimbingChannelReq = Pick<
  Climbing,
  'name' | 'description' | 'startDate' | 'endDate'
> & {};

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
