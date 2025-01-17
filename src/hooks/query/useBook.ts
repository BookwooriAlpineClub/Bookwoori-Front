import type { GetBookListRes, GetBookDetailRes } from '@src/types/apis/book';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getBookList, getBookDetail } from '@src/apis/book';

const initBookDetail: GetBookDetailRes = {
  isbn13: '',
  title: '',
  author: '',
  cover: '',
  publisher: '',
  pubYear: '',
  description: '',
  itemPage: -1,
};

interface Props {
  keyword?: string;
  isbn13?: string;
}
const useBook = ({ keyword, isbn13 }: Props) => {
  const { data: bookList } = useQuery<GetBookListRes, AxiosError>({
    queryKey: ['getBookList', keyword],
    queryFn: () => getBookList(keyword as string),
    initialData: [],
  });
  const { data: bookDetail } = useQuery<GetBookDetailRes, AxiosError>({
    queryKey: ['getBookDetail', isbn13],
    queryFn: () => getBookDetail(isbn13 as string),
    initialData: initBookDetail,
  });

  return { bookList, bookDetail };
};

export default useBook;
