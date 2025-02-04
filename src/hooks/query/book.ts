import type { AxiosError } from 'axios';
import type Book from '@src/types/book';
import type { GetBookListRes, GetBookDetailRes } from '@src/types/apis/book';
import { useQuery } from '@tanstack/react-query';
import { getBookList, getBookDetail } from '@src/apis/book';

const useGetBookList = (keyword: string) => {
  return useQuery<GetBookListRes, AxiosError>({
    queryKey: ['getBookList', keyword],
    queryFn: () => getBookList(keyword),
    initialData: [],
  });
};
const useGetBookDetail = (isbn13: Book['isbn13']) => {
  return useQuery<GetBookDetailRes, AxiosError>({
    queryKey: ['getBookDetail', isbn13],
    queryFn: () => getBookDetail(isbn13),
    initialData: {
      isbn13: '',
      title: '',
      author: '',
      cover: '',
      publisher: '',
      pubDate: '',
      description: '',
      itemPage: -1,
    },
  });
};

export { useGetBookList, useGetBookDetail };
