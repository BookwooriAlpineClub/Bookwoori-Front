import type Book from '@src/types/book';

// 도서 검색 목록 조회
type ResBookListitem = Omit<Book, 'description' | 'itemPage'>;

// 도서 상세 조회
type ResBookDetail = Book;

export type { ResBookListitem, ResBookDetail };
