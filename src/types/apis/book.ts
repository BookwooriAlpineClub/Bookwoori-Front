import type { Book, BookColumnListitem } from '@src/types/book';

/**
 * 도서 검색 목록 조회
 */
export type BookListGetRes = BookColumnListitem[];
/**
 * 도서 상세 조회
 */
export type BookDetailGetRes = Book;
