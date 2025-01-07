import type Book from '@src/types/book';
import type Record from '@src/types/record';

// 책 기록 목록 조회
export type RecordListitemQueryRes = Omit<
  Book,
  'publisher' | 'pubYear' | 'description' | 'itemPage'
> & {
  records: NonNullable<
    | Pick<Record, 'recordId' | 'status'>
    | Partial<Pick<Record, 'currentPage' | 'starReview'>>
  >[];
};

// 책 평가 목록 조회
export type ReviewListitemQueryRes = Omit<Book, 'description' | 'itemPage'> & {
  records: NonNullable<
    Pick<Record, 'recordId' | 'status' | 'currentPage' | 'starReview'>
  >[];
};

// 책 기록 상세 조회
export type RecordDetailQueryRes = Book & { records: Record[] };

// 책 기록 추가
export type RecordAddReq = Pick<Book, 'isbn13'> & Omit<Record, 'recordId'>;

// 책 기록 수정
export type RecordEditReq = Partial<Omit<RecordAddReq, 'isbn'>>;

// 책 기록 삭제
// 없음
