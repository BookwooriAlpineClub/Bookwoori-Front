export interface Book {
  readonly isbn13: string;
  readonly title: string;
  readonly author: string;
  readonly cover: string;
  readonly publisher: string;
  readonly pubYear: string;
  readonly description: string;
  readonly itemPage: number;
}

export interface BookColumnListitem {
  readonly isbn13: Book['isbn13'];
  readonly title: Book['title'];
  readonly author: Book['author'];
  readonly cover: Book['cover'];
  readonly publisher: Book['publisher'];
  readonly pubYear: Book['pubYear'];
}

export interface BookGridListitem {
  readonly isbn13: Book['isbn13'];
  readonly title: Book['title'];
  readonly author: Book['author'];
  readonly cover: Book['cover'];
}
