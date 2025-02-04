import type Book from '@src/types/book';

/**
 * 도서 검색 목록 조회
 */
export type GetBookListRes = Omit<Book, 'description' | 'itemPage'>[];
/**
 * 도서 상세 조회
 */
export type GetBookDetailRes = Book;
