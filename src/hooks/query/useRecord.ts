import type {
  RecordListItem,
  RecordDetail,
  RecordEdit,
  ReviewListItem,
} from '@src/types/apis/record.d';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  getRecordList,
  getRecordDetail,
  postRecord,
  putRecord,
  deleteRecord as delRecord,
  getReviewList,
} from '@src/apis/record';

const initRecordDetail: RecordDetail = {
  recordId: -1,
  readingStatus: 'UNREAD',
  startDate: '',
  currentPage: -1,
  maxPage: -1,
  star: -1,
  review: {
    createdAt: '',
    modifiedAt: '',
    reviewId: -1,
    record: {
      recordId: -1,
      status: 'UNREAD',
      startDate: '',
      endDate: '',
      currentPage: -1,
      maxPage: -1,
      star: -1,
    },
    content: '',
  },
  bookInfo: {
    title: '',
    author: '',
    publisher: '',
    pubDate: '',
    itemPage: -1,
    description: '',
    isbn13: '',
    cover: '',
  },
};

interface Props {
  status?: RecordListItem['readingStatus'];
  recordId?: RecordDetail['recordId'];
}
const useRecord = ({ status = 'UNREAD', recordId = -1 }: Props) => {
  const { data: recordList } = useQuery<RecordListItem[], AxiosError>({
    queryKey: ['getRecordList', status],
    queryFn: () => getRecordList(status),
    initialData: [],
  });

  const { data: recordDetail } = useQuery<RecordDetail, AxiosError>({
    queryKey: ['getRecordDetail', recordId],
    queryFn: () => getRecordDetail(recordId),
    initialData: initRecordDetail,
  });

  const createRecord = useMutation({
    mutationFn: ({ body }: { body: RecordEdit }) => postRecord(body),
  });

  const updateRecord = useMutation({
    mutationFn: ({ body }: { body: RecordEdit }) => putRecord(recordId, body),
  });

  const deleteRecord = useMutation({
    mutationFn: () => delRecord(recordId),
  });

  const { data: reviewList } = useQuery<ReviewListItem[], AxiosError>({
    queryKey: ['getReviewList'],
    queryFn: () => getReviewList(),
    initialData: [],
  });

  return {
    recordList,
    recordDetail,
    createRecord,
    updateRecord,
    deleteRecord,
    reviewList,
  };
};

export default useRecord;
