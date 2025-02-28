import { Climbing, ClimbingMember } from '@src/types/climbing';
import { ClimbingReadingStatusType, EmojiType } from '@src/constants/constants';
import Book from '@src/types/book';

export type PostClimbingChannelReq = Pick<
  Climbing,
  'name' | 'description' | 'startDate' | 'endDate'
> & {
  serverId: number;
  isbn: string;
};

export type PatchClimbingChannelReq = Pick<
  Climbing,
  'name' | 'description' | 'startDate' | 'endDate'
> & {};

export interface GetClimbingRes extends Climbing {}

export interface ClimbingRecruitListRes {
  readyClimbingList: Climbing[];
}

export type GetClimbingChannelMembersRes = {
  climbingMemberList: ClimbingMember[];
};

export type PatchClimbingMemoReq = {
  memo: string | null;
};

export type GetClimbingReviewRes =
  | GetClimbingReviewRes1
  | GetClimbingReviewRes2
  | GetClimbingReviewRes3;

type GetClimbingReviewRes1 = {
  hasShared: true;
  isShareable: true;
  ClimbingMemberReviewList: {
    memberId: number;
    profileImg: string | null;
    nickname: string;
    star: number;
    content: string;
    reviewId: number;
    readingStatus: ClimbingReadingStatusType;
    reviewEmojiList: {
      emoji: keyof typeof EmojiType;
      emojiCount: number;
      isClicked: boolean;
    }[];
  }[];
};

type GetClimbingReviewRes2 = {
  hasShared: false;
  isShareable: false;
  bookInfo: Book;
};

type GetClimbingReviewRes3 = {
  hasShared: false;
  isShareable: true;
  bookInfo: Book;
  reviewList: {
    content: string;
    createdAt: string;
    modifiedAt: string;
    reviewId: number;
    star: number;
  }[];
};

export type GetClimbingReviewEmojiRes = {
  reviewEmojiList: {
    emoji: string;
    reviewEmojiMemberList: Pick<
      ClimbingMember,
      'memberId' | 'nickname' | 'profileImg' | 'level' | 'mountain'
    >[];
  }[];
};
