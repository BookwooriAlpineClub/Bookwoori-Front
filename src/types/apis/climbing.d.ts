import type { BookDetail } from '@src/types/apis/book.d';
import { ClimbingStatus } from '@src/constants/status';

declare type Climbing = {
  climbingId: number;
  status: ClimbingStatus;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  isOwner: boolean;
  bookInfo: []; // book 타입에서 import 예정
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
  nickname: string;
  star: number;
  reviewId: number;
  content: string;
  reviewEmojiList: { emoji: string; emojiCount: number }[];
};

export type ClimbingResponse = {
  hasShared: boolean;
  isShareable: boolean;
  bookInfo: BookDetail;
  content?: string;
  reviewId?: number;
  star?: number;
  ClimbingMemberReviewList?: ClimbingMemberReview[];
};
