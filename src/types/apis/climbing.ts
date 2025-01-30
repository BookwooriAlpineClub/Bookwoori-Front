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

export interface getClimbingRes extends Climbing {}

export interface ClimbingRecruitListRes {}

export type getClimbingChannelMembersRes = {
  climbingMemberList: ClimbingMember[];
};

export type patchClimbingMemoReq = {
  memo: string | null;
};

export type getClimbingReviewListRes = {
  hasShared?: boolean;
  isShareable?: boolean;
  ClimbingMemberReviewList: [
    {
      profileImg: string;
      nickname: string;
      star: number;
      content: string;
      reviewId: number;
      reviewEmojiList: { emoji: EmojiTypeType; emojiCount: number }[];
    },
  ];
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
