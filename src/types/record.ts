export interface Record {
  readonly recordId: number;
  status: 'UNREAD' | 'WISH' | 'READING' | 'FINISHED';
  startDate: string | null;
  endDate: string | null;
  currentPage: number | null;
  starReview: number | null;
  contentReview: string | null;
}

export interface RecordListitem {
  readonly recordId: Record['recordId'];
  status: Record['status'];
  currentPage?: NonNullable<Record['currentPage']>;
  starReview?: NonNullable<Record['starReview']>;
}

export interface ReviewListitem {
  readonly recordId: Record['recordId'];
  status: Record['status'];
  starReview: NonNullable<Record['starReview']>;
  contentReview: NonNullable<Record['contentReview']>;
}
