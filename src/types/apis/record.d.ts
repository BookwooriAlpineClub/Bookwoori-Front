import type { BookInfo } from '@src/types/apis/book.d';

type Record = {
  recordId: number;
  readingStatus: 'UNREAD' | 'WISH' | 'READING' | 'FINISHED';
  startDate: string;
  endDate: string;
  currentPage: number;
  maxPage: number;
  star: number;
  bookInfo: BookInfo;
};
type Review = {
  createdAt: string;
  modifiedAt: string;
  reviewId: number;
  record: Pick<
    Record,
    'recordId' | 'startDate' | 'currentPage' | 'maxPage' | 'star'
  > & { status: Record['readingStatus']; endDate: string };
  content: string;
};

export type RecordListItem = Pick<
  Record,
  'recordId' | 'readingStatus' | 'currentPage' | 'maxPage' | 'star' | 'bookInfo'
> & {
  memberId: number;
  reviewContent: Review['content'];
};
export type RecordDetail = Pick<
  Record,
  | 'recordId'
  | 'readingStatus'
  | 'startDate'
  | 'currentPage'
  | 'maxPage'
  | 'star'
  | 'bookInfo'
> & {
  review: Review;
};
export type RecordEdit = Pick<BookInfo, 'isbn13'> &
  Pick<Record, 'startDate' | 'endDate' | 'currentPage' | 'star'> & {
    status: Record['readingStatus'];
    reviewContent: Review['content'];
  };

export type ReviewListItem = Pick<
  Record,
  'recordId' | 'memberId' | 'star' | 'bookInfo'
> & { reviewContent: Review['content'] };
