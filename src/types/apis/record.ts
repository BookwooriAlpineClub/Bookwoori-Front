import type Book from '@src/types/book';
import type Record from '@src/types/record';
import type Review from '@src/types/review';

/**
 * 책 기록 목록 조회
 */
export type GetRecordListRes = (Pick<
  Book,
  'isbn13' | 'title' | 'author' | 'cover'
> &
  Partial<Pick<Book, 'itemPage'>> & {
    record: Record;
    ReviewStarAve?: number;
  })[];
/**
 * 책 기록 상세 조회
 */
export interface GetRecordDetailRes extends Book {
  record: Record;
  reviewList: Review[];
}
/**
 * 책 기록 추가
 */
export type PostRecordReq = Pick<Book, 'isbn13'> & Omit<Record, 'recordId'>;
/**
 * 책 기록 수정
 */
export type PatchRecordReq = Omit<Record, 'recordId'>;
/**
 * 책 기록 삭제
 */
// 타입이 필요하지 않음
