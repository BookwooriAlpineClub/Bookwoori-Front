type Book = {
  title: string;
  author: string;
  publisher: string;
  itemPage: number;
  description: string;
  isbn13: string;
};
export type BookListItem = Pick<
  Book,
  'title' | 'author' | 'publisher' | 'isbn13'
> & {
  pubYear: string;
  cover: string;
};
export type BookDetail = Book & {
  pubDate: string;
  coverImg: string;
};
export type BookInfo = Book & {
  pubDate: string;
  cover: string;
};
