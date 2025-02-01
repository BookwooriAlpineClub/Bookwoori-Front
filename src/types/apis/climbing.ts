import { Climbing, ClimbingMember } from '@src/types/climbing';
import { EmojiType, EmojiTypeType } from '@src/constants/constants';
import Book from '@src/types/book';

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

export type getClimbingReviewRes =
  | getClimbingReviewRes1
  | getClimbingReviewRes2;

type getClimbingReviewRes1 = {
  hasShared: true;
  isShareable: true;
  ClimbingMemberReviewList: {
    memberId: number;
    profileImg: string | null;
    nickname: string;
    star: number;
    content: string;
    reviewId: number;
    reviewEmojiList: { emoji: keyof typeof EmojiType; emojiCount: number }[];
  }[];
};

type getClimbingReviewRes2 = {
  hasShared: false;
  isShareable: boolean;
  bookInfo: Book;
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
