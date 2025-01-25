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
  isOWner: boolean;
  bookInfo: Book;
};

export type ClimbingMember = {
  isMine: boolean;
  memberId: number;
  nickname: string;
  profileImg: string | null;
  level: number;
  mountain: string;
  status: 'UNREAD' | 'READ' | 'READING' | 'FINISHED';
  currentPage: number;
  memo: string | null;
};

type ClimbingListKey =
  | 'myClimbings'
  | 'readyClimbings'
  | 'runningClimbings'
  | 'endClimbingings';

export type ClimbingInfo = Pick<Climbing, 'name' | 'climbingId'> &
  Pick<Book, 'cover'>;

export type ClimbingList = {
  [key in ClimbingListKey]: ClimbingInfo[];
};
