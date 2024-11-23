import type { AxiosResponse } from 'axios';
import type { Record, Review } from '@src/types/apis/record.d';
import { authClient } from '@src/apis/index';

// 백엔드에 수정 요청함
export const getRecordList = async <Res = Record[]>(
  status: Pick<Record, 'status'>,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/records?status=${status}`);
  return response.data;
};

// 백엔드에 수정 요청함
export const getReviewList = async <Res = Review[]>(): Promise<Res> => {
  const response = await authClient.get<Res>(`/records/reviews`);
  return response.data;
};

// 백엔드에 수정 요청함
export const getRecordItem = async <Res = Record>(
  recordId: number,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/records?recordId=${recordId}`);
  return response.data;
};

// 백엔드에 수정 요청함
export const postRecord = async <Res = void, Req = Record>(
  body: Req,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>, Req>(
    `/records`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};

// 백엔드에 수정 요청함
export const putRecord = async <Res = void, Req = Record>(
  recordId: number,
  body: Req,
): Promise<Res> => {
  const response = await authClient.put<Res, AxiosResponse<Res>, Req>(
    `/records/${recordId}`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};

export const deleteRecord = async <Res = void>(
  recordId: number,
): Promise<Res> => {
  const response = await authClient.delete<Res>(`/records/${recordId}`);
  return response.data;
};
