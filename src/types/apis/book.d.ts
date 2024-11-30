export type BookDetail = {
  title: string;
  author: string;
  publisher: string;
  pubYear: string;
  itemPage: number;
  description: string;
  isbn13: string;
  cover: string;
};
export type BookListItem = Omit<BookDetail, 'itemPage' | 'description'>;
