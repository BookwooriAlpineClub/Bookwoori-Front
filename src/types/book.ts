interface Book {
  readonly isbn13: string;
  readonly title: string;
  readonly author: string;
  readonly cover: string;
  readonly publisher: string;
  readonly pubYear: string;
  readonly description: string;
  readonly itemPage: number;
}

export default Book;
