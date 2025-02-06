import type { AxiosError } from 'axios';
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
const useGetRecordDetail = (recordId: Record['recordId']) => {
  return useQuery<GetRecordDetailRes, AxiosError>({
    queryKey: ['getRecordDetail', recordId],
    queryFn: () => getRecordDetail(recordId),
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
