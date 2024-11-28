import { AxiosResponse } from 'axios';
import { authClient } from '@src/apis/index';
import { Climbing, ReviewEmojiResponse } from '@src/types/apis/climbing.d';

const CLIMB_BASE_URL = '/climbs';
const buildClimbUrl = (path: string = '') => `${CLIMB_BASE_URL}${path}`;

export const postClimbing = async <Res = void, Req = Climbing>(
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>, Req>(
    buildClimbUrl(),
    body,
    { headers: { 'Content-Type': 'application/json', ...headers } },
  );
  return response.data;
};

export const patchClimbing = async <Res = void, Req = Partial<Climbing>>(
  climbingId: number,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>, Req>(
    buildClimbUrl(`/${climbingId}`),
    body,
    { headers: { 'Content-Type': 'application/json', ...headers } },
  );
  return response.data;
};

export const getClimbing = async <Res = Climbing>(
  climbingId: number,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildClimbUrl(`/${climbingId}`),
    { headers },
  );
  return response.data;
};

export const patchClimbingReview = async <Res = void, Req = Partial<Climbing>>(
  climbingId: number,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>, Req>(
    buildClimbUrl(`/${climbingId}/reviews`),
    body,
    { headers: { 'Content-Type': 'application/json', ...headers } },
  );
  return response.data;
};

export const postClimbingReviewEmoji = async <Res = void, Req = void>(
  climbingId: number,
  reviewId: number,
  emoji: string,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>, Req>(
    buildClimbUrl(`/${climbingId}/reviews/${reviewId}/emojis/${emoji}`),
    body,
    { headers: { 'Content-Type': 'application/json', ...headers } },
  );
  return response.data;
};

export const getClimbingMembers = async <Res = void>(
  climbingId: number,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildClimbUrl(`/${climbingId}/members`),
    { headers },
  );
  return response.data;
};

export const postClimbingMember = async <Res = void, Req = void>(
  climbingId: number,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>, Req>(
    buildClimbUrl(`/${climbingId}/members`),
    body,
    { headers: { 'Content-Type': 'application/json', ...headers } },
  );
  return response.data;
};

export const patchClimbingMemberMemo = async <
  Res = void,
  Req = { memo: string },
>(
  climbingId: number,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>, Req>(
    buildClimbUrl(`/${climbingId}/members/memo`),
    body,
    { headers: { 'Content-Type': 'application/json', ...headers } },
  );
  return response.data;
};

export const getClimbingReviewEmojis = async <Res = ReviewEmojiResponse>(
  climbingId: number,
  reviewId: number,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildClimbUrl(`/${climbingId}/reviews/${reviewId}/emojis`),
    { headers },
  );
  return response.data;
};
