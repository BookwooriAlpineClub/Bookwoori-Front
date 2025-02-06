import type { AxiosError } from 'axios';
import type Book from '@src/types/book';
import type Record from '@src/types/record';
import type {
  GetRecordListRes,
  GetRecordDetailRes,
  PostRecordReq,
  PatchRecordReq,
} from '@src/types/apis/record';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getRecordList,
  getRecordDetail,
  postRecord,
  patchRecord,
  deleteRecord,
} from '@src/apis/record';

const useGetRecordList = (status: Record['status']) => {
  return useQuery<GetRecordListRes, AxiosError>({
    queryKey: ['getRecordList', status],
    queryFn: () => getRecordList(status),
    initialData: [],
  });
};
const useGetRecordDetail = (isbn13: Book['isbn13']) => {
  return useQuery<GetRecordDetailRes, AxiosError>({
    queryKey: ['getRecordDetail', isbn13],
    queryFn: () => getRecordDetail(Number(isbn13)),
    initialData: {
      isbn13: '',
      title: '',
      author: '',
      cover: '',
      publisher: '',
      pubDate: '',
      description: '',
      itemPage: -1,
      record: {
        recordId: -1,
        status: 'UNREAD',
        startDate: null,
        endDate: null,
        currentPage: null,
      },
      reviewList: [],
    },
  });
};
const usePostRecord = () => {
  return useMutation({
    mutationFn: ({ body }: { body: PostRecordReq }) => postRecord(body),
  });
};
const usePatchRecord = (recordId: Record['recordId']) => {
  return useMutation({
    mutationFn: ({ body }: { body: PatchRecordReq }) =>
      patchRecord(recordId, body),
  });
};
const useDeleteRecord = (recordId: Record['recordId']) => {
  return useMutation({
    mutationFn: () => deleteRecord(recordId),
  });
};

export {
  useGetRecordList,
  useGetRecordDetail,
  usePostRecord,
  usePatchRecord,
  useDeleteRecord,
};
