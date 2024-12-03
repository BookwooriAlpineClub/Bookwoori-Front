import type { AxiosResponse } from 'axios';
import type {
  RecordListItem,
  RecordDetail,
  RecordEdit,
  ReviewListItem,
} from '@src/types/apis/record.d';
import { authClient } from '@src/apis/index';

/**
 * 책 기록 목록 조회
 */
export const getRecordList = async <Res = RecordListItem[]>(
  status: RecordListItem['readingStatus'],
): Promise<Res> => {
  const response = await authClient.get<Res>(`/records?status=${status}`);
  return response.data;
};
/**
 * 책 기록 상세 조회
 */
export const getRecordDetail = async <Res = RecordDetail>(
  recordId: RecordDetail['recordId'],
): Promise<Res> => {
  const response = await authClient.get<Res>(`/records/${recordId}`);
  return response.data;
};
/**
 * 책 기록 추가
 */
export const postRecord = async <Res = void, Req = RecordEdit>(
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
export const putRecord = async <Res = void, Req = RecordEdit>(
  recordId: RecordDetail['recordId'],
  body: Req,
): Promise<Res> => {
  const response = await authClient.put<Res, AxiosResponse<Res>, Req>(
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
  recordId: RecordDetail['recordId'],
): Promise<Res> => {
  const response = await authClient.delete<Res>(`/records/${recordId}`);
  return response.data;
};
/**
 * 책 평가 목록 조회
 */
export const getReviewList = async <Res = ReviewListItem[]>(): Promise<Res> => {
  const response = await authClient.get<Res>(`/records/reviews`);
  return response.data;
};
