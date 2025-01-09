import type { Book } from '@src/types/book';
import type { BookListGetRes, BookDetailGetRes } from '@src/types/apis/book';
import { authClient } from '@src/apis/index';

/**
 * 도서 검색 목록 조회
 */
export const getBookList = async <Res = BookListGetRes>(
  keyword: string,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/books?keyword=${keyword}`);
  return response.data;
};
/**
 * 도서 상세 조회
 */
export const getBookDetail = async <Res = BookDetailGetRes>(
  isbn13: Book['isbn13'],
): Promise<Res> => {
  const response = await authClient.get<Res>(`/books/${isbn13}`);
  return response.data;
};
