export default interface Record {
  readonly recordId: number;
  status: 'UNREAD' | 'WISH' | 'READING' | 'FINISHED';
  startDate: string | null;
  endDate: string | null;
  currentPage: number | null;
  starReview: number | null;
  contentReview: string | null;
}
