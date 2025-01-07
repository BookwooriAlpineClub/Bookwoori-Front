import type Book from '@src/types/book';

// 도서 검색 목록 조회
export type ResBookListitem = Omit<Book, 'description' | 'itemPage'>;

// 도서 상세 조회
export type ResBookDetail = Book;
