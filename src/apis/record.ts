import type { AxiosResponse } from 'axios';
import type { Record, Review } from '@src/types/apis/record.d';
import { authClient } from '@src/apis/index';

/**
 * 진행도별 책 기록 목록 조회
 * @ 백엔드에 수정 요청함
 */
export const getRecordList = async <Res = Record[]>(
  status: Pick<Record, 'status'>,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/records?status=${status}`);
  return response.data;
};

/**
 * 책 평가 목록 조회
 * @ 백엔드에 수정 요청함
 */
export const getReviewList = async <Res = Review[]>(): Promise<Res> => {
  const response = await authClient.get<Res>(`/records/reviews`);
  return response.data;
};

/**
 * 책 기록 상세 조회
 * @ 백엔드 구현 미완료
 */
export const getRecordDetail = async <Res = Record>(
  recordId: number,
): Promise<Res> => {
  const response = await authClient.get<Res>(`/records?recordId=${recordId}`);
  return response.data;
};

/**
 * 책 기록 추가
 * @ 백엔드에 수정 요청함
 */
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

/**
 * 책 기록 수정
 * @ 백엔드에 수정 요청함
 */
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

/** 책 기록 삭제 */
export const deleteRecord = async <Res = void>(
  recordId: number,
): Promise<Res> => {
  const response = await authClient.delete<Res>(`/records/${recordId}`);
  return response.data;
};
