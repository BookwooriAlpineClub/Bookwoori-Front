import type { BookInfo } from '@src/types/apis/book.d';

export type Record = Pick<BookInfo, 'bookId'> & {
  status: 'WISH' | 'READING' | 'FINISHED';
  startDate: string;
  endDate: string;
  currentPage: number;
  star: number;
  review: string;
};

export type Review = Pick<Record, 'star' | 'review'> & {
  bookInfo: BookInfo;
  recordId: number;
  reviewId: number;
};
