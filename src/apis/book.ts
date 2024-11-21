import type { Book } from '@src/types/apis/book.d';
import { authClient } from '@src/apis/index';

export const getBookList = async <Res = Book[]>(
  keyword: string,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/books?keyword=${keyword}`);
  return response.data;
};

export const getBookItem = async <Res = Book>(
  isbn13: number
): Promise<Res> => {
  const response = await authClient.get<Res>(`/books/${isbn13}`);
  return response.data;
};
