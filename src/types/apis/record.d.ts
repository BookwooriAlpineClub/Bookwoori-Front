import type { BookDetail } from '@src/types/apis/book.d';

export type Record = {
  recordId: number;
  memberId: number;
  readingStatus: 'WISH' | 'READING' | 'FINISHED';
  startDate: string;
  endDate: string;
  currentPage: number;
  maxPage: number;
  star: number;
  reviewContent: string;
  bookInfo: BookDetail;
};
export type Review = Pick<
  Record,
  'recordId' | 'star' | 'reviewContent' | 'bookInfo'
> & {
  reviewId: number;
};
