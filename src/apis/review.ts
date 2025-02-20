import type { AxiosResponse } from 'axios';
import type Review from '@src/types/review';
import type {
  GetReviewListRes,
  PostReviewReq,
  PatchReviewReq,
} from '@src/types/apis/review';
import { authClient } from '@src/apis/index';

/**
 * 책 평가 목록 조회
 */
export const getReviewList = async <Res = GetReviewListRes>(): Promise<Res> => {
  const response = await authClient.get<Res>(`/reviews`);
  return response.data;
};
/**
 * 감상평 추가
 */
export const postReview = async <Res = void, Req = PostReviewReq>(
  body: Req,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>, Req>(
    `/reviews`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};
/**
 * 감상평 수정
 */
export const patchReview = async <Res = void, Req = PatchReviewReq>(
  reviewId: Review['reviewId'],
  body: Req,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>, Req>(
    `/reviews/${reviewId}`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};
/**
 * 감상평 삭제
 */
export const deleteReview = async <Res = void>(
  reviewId: Review['reviewId'],
): Promise<Res> => {
  const response = await authClient.delete<Res>(`/reviews/${reviewId}`);
  return response.data;
};
