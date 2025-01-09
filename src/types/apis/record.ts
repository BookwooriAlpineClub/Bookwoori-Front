import type { Book, BookColumnListitem, BookGridListitem } from '@src/types/book';
import type { Record, RecordListitem, ReviewListitem } from '@src/types/record';

/**
 * 책 기록 목록 조회
 */
export interface GetRecordListRes extends BookGridListitem {
  records: RecordListitem[];
}
/**
 * 책 평가 목록 조회
 */
export interface GetReviewListRes extends BookColumnListitem {
  records: ReviewListitem[];
}
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
