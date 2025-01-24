import type Book from '@src/types/book';
import type { ClimbingStatusType } from '@src/constants/constants';

export type Climbing = {
  climbingId: number;
  status: ClimbingStatusType;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  isOwner: boolean;
  bookInfo: Book;
};

export type ClimbingMember = {
  isMine: boolean;
  memberId: number;
  nickname: string;
  profileImg: string | null;
  level: number;
  mountain: string;
  status: 'UNREAD' | 'READ';
  currentPage: number;
  memo: string | null;
};
