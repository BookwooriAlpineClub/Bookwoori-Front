import type { BookListItem, BookDetail } from '@src/types/apis/book.d';
import { authClient } from '@src/apis/index';

/**
 * 도서 검색 목록 조회
 */
export const getBookList = async <Res = BookListItem[]>(
  keyword: string,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/books?keyword=${keyword}`);
  return response.data;
};
/**
 * 도서 상세 조회
 */
export const getBookDetail = async <Res = BookDetail>(
  isbn13: BookDetail['isbn13'],
): Promise<Res> => {
  const response = await authClient.get<Res>(`/books/${isbn13}`);
  return response.data;
};
