import type Book from '@src/types/book';
import type Record from '@src/types/record';
import type Review from '@src/types/review';

/**
 * 책 평가 목록 조회
 */
export type GetReviewListRes = (Omit<Book, 'description' | 'itemPage'> & {
  reviewList: Review[];
})[];
/**
 * 감상평 추가
 */
export type PostReviewReq = Pick<Record, 'recordId'> &
  Pick<Review, 'star' | 'content'>;
/**
 * 감상평 수정
 */
export type PatchReviewReq = Pick<Record, 'recordId'> &
  Pick<Review, 'star' | 'content'>;
