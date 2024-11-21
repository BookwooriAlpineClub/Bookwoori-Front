export type Book = {
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  itemPage: number;
  description: string;
  isbn13: string;
  cover: string;
};

export type BookInfo = Pick<
  Book,
  'title' | 'author' | 'publisher' | 'itemPage' | 'isbn13' | 'cover'
> & {
  bookId: number;
};
