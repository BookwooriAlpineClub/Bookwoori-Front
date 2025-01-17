import type { BookInfo } from '@src/types/apis/book.d';
import { ClimbingStatus } from '@src/constants/constants';

export type book = {
  author: string;
  cover: string;
  description: string;
  isbn13: string;
  itemPage: string;
  pubDate: string;
  publisher: string;
  title: string;
};

export type Climbing = {
  climbingId: number;
  status: ClimbingStatus;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  isOwner: boolean;
  bookInfo: book;
};

// member에서 가져올 것
type EmojiMember = {
  memberId: number;
  nickname: string;
  profileImg: string | null;
  level: number;
  mountain: string;
};

export type ReviewEmoji = {
  emoji: string;
  reviewEmojiMemberList: EmojiMember[];
};

export type ReviewEmojiResponse = {
  reviewEmojiList: ReviewEmoji[];
};

type ClimbingMemberReview = {
  memberId: number;
  profileImg: string;
  nickname: string;
  star: number;
  reviewId: number;
  content: string;
  reviewEmojiList: { emoji: string; emojiCount: number }[];
};

export type ClimbingResponse = {
  hasShared: boolean;
  isShareable: boolean;
  bookInfo: BookInfo;
  content?: string;
  reviewId?: number;
  star?: number;
  ClimbingMemberReviewList?: ClimbingMemberReview[];
};
