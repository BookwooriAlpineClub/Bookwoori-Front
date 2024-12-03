import type { BookListItem, BookDetail } from '@src/types/apis/book';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getBookList, getBookDetail } from '@src/apis/book';

interface Props {
  keyword?: string;
  isbn13?: string;
}
const useBook = ({ keyword, isbn13 }: Props) => {
  const { data: bookList } = useQuery<BookListItem[], AxiosError>({
    queryKey: ['getBookList', keyword],
    queryFn: () => getBookList(keyword as string),
    initialData: [],
  });
  const { data: bookDetail } = useQuery<BookDetail, AxiosError>({
    queryKey: ['getBookDetail', isbn13],
    queryFn: () => getBookDetail(isbn13 as string),
  });

  return { bookList, bookDetail };
};

export default useBook;
