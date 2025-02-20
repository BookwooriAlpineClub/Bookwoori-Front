import type { AxiosResponse } from 'axios';
import type Record from '@src/types/record';
import type {
  GetRecordListRes,
  GetRecordDetailRes,
  PostRecordReq,
  PatchRecordReq,
} from '@src/types/apis/record';
import { authClient } from '@src/apis/index';

/**
 * 책 기록 목록 조회
 */
export const getRecordList = async <Res = GetRecordListRes>(
  status: Record['status'],
): Promise<Res> => {
  const response = await authClient.get<Res>(`/records?status=${status}`);
  return response.data;
};
/**
 * 책 기록 상세 조회
 */
export const getRecordDetail = async <Res = GetRecordDetailRes>(
  recordId: Record['recordId'],
): Promise<Res> => {
  const response = await authClient.get<Res>(`/records/${recordId}`);
  return response.data;
};
/**
 * 책 기록 추가
 */
export const postRecord = async <Res = void, Req = PostRecordReq>(
  body: Req,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>, Req>(
    `/records`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};
/**
 * 책 기록 수정
 */
export const patchRecord = async <Res = void, Req = PatchRecordReq>(
  recordId: Record['recordId'],
  body: Req,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>, Req>(
    `/records/${recordId}`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};
/**
 * 책 기록 삭제
 */
export const deleteRecord = async <Res = void>(
  recordId: Record['recordId'],
): Promise<Res> => {
  const response = await authClient.delete<Res>(`/records/${recordId}`);
  return response.data;
};
