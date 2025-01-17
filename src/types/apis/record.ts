import type Book from '@src/types/book';
import type Record from '@src/types/record';

/**
 * 책 기록 목록 조회
 */
export type GetRecordListRes = {
  readonly isbn13: Book['isbn13'];
  readonly title: Book['title'];
  readonly author: Book['author'];
  readonly cover: Book['cover'];
  readonly itemPage?: Book['itemPage'];
  records: {
    readonly recordId: Record['recordId'];
    status: Record['status'];
    currentPage?: NonNullable<Record['currentPage']>;
    starReview?: NonNullable<Record['starReview']>;
  }[];
}[];
/**
 * 책 평가 목록 조회
 */
export type GetReviewListRes = {
  readonly isbn13: Book['isbn13'];
  readonly title: Book['title'];
  readonly author: Book['author'];
  readonly cover: Book['cover'];
  readonly publisher: Book['publisher'];
  readonly pubYear: Book['pubYear'];
  records: {
    readonly recordId: Record['recordId'];
    status: Record['status'];
    starReview: NonNullable<Record['starReview']>;
    contentReview: NonNullable<Record['contentReview']>;
  }[];
}[];
/**
 * 책 기록 상세 조회
 */
export interface GetRecordDetailRes extends Book {
  records: Record[];
}
/**
 * 책 기록 추가
 */
export type PostRecordReq = Pick<Book, 'isbn13'> & Omit<Record, 'recordId'>;
/**
 * 책 기록 수정
 */
export type PatchRecordReq = Partial<Omit<Record, 'recordId'>>;
/**
 * 책 기록 삭제
 */
// 없음
