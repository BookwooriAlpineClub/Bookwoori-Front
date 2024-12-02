export type BookDetail = {
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  itemPage: number;
  description: string;
  isbn13: string;
  coverImg: string;
};
export type BookListItem = Omit<
  BookDetail,
  'itemPage' | 'description' | 'pubDate' | 'coverImg'
> & {
  pubYear: string;
  cover: string;
};
