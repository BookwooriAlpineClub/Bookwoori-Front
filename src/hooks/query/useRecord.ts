import type { Record } from '@src/types/record';
import type {
  GetRecordListRes,
  GetReviewListRes,
  GetRecordDetailRes,
  PostRecordReq,
  PatchRecordReq,
} from '@src/types/apis/record';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  getRecordList,
  getReviewList,
  getRecordDetail,
  postRecord,
  putRecord,
  deleteRecord as delRecord,
} from '@src/apis/record';

const initRecordDetail: GetRecordDetailRes = {
  isbn13: '',
  title: '',
  author: '',
  cover: '',
  publisher: '',
  pubYear: '',
  description: '',
  itemPage: -1,
  records: [],
};

interface Props {
  status?: Record['status'];
  recordId?: Record['recordId'];
}
const useRecord = ({ status = 'UNREAD', recordId = -1 }: Props) => {
  const { data: recordList } = useQuery<GetRecordListRes, AxiosError>({
    queryKey: ['getRecordList', status],
    queryFn: () => getRecordList(status),
    initialData: [],
  });

  const { data: reviewList } = useQuery<GetReviewListRes, AxiosError>({
    queryKey: ['getReviewList'],
    queryFn: () => getReviewList(),
    initialData: [],
  });

  const { data: recordDetail } = useQuery<GetRecordDetailRes, AxiosError>({
    queryKey: ['getRecordDetail', recordId],
    queryFn: () => getRecordDetail(recordId),
    initialData: initRecordDetail,
  });

  const createRecord = useMutation({
    mutationFn: ({ body }: { body: PostRecordReq }) => postRecord(body),
  });

  const updateRecord = useMutation({
    mutationFn: ({ body }: { body: PatchRecordReq }) =>
      putRecord(recordId, body),
  });

  const deleteRecord = useMutation({
    mutationFn: () => delRecord(recordId),
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
