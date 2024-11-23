import type { Book } from '@src/types/apis/book.d';
import { authClient } from '@src/apis/index';

/** 도서 검색 목록 조회 */
export const getBookList = async <Res = Book[]>(
  keyword: string,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/books?keyword=${keyword}`);
  return response.data;
};

/** 도서 상세 조회 */
export const getBookDetail = async <Res = Book>(
  isbn13: number,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/books/${isbn13}`);
  return response.data;
};
