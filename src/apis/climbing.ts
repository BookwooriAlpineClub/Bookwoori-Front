import { AxiosResponse } from 'axios';
import { authClient } from '@src/apis/index';
import {
  getClimbingChannelMembersRes,
  getClimbingRes,
  getClimbingReviewEmojiRes,
  getClimbingReviewRes,
  patchClimbingChannelReq,
  patchClimbingMemoReq,
  postClimbingChannelReq,
} from '@src/types/apis/climbing';

const CLIMB_BASE_URL = '/climbs';
const buildClimbUrl = (path: string = '') => `${CLIMB_BASE_URL}${path}`;

/* 클라이밍 채널 생성 */
export const postClimbing = async (
  body: postClimbingChannelReq,
): Promise<void> => {
  const response = await authClient.post<
    void,
    AxiosResponse<void>,
    postClimbingChannelReq
  >(buildClimbUrl(), body, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

/* 클라이밍 채널 편집 */
export const patchClimbing = async (
  climbingId: number,
  body: patchClimbingChannelReq,
): Promise<void> => {
  const response = await authClient.patch<
    void,
    AxiosResponse<void>,
    patchClimbingChannelReq
  >(buildClimbUrl(`/${climbingId}`), body, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

/* 클라이밍 상세 정보 */
export const getClimbing = async (
  climbingId: number,
): Promise<getClimbingRes> => {
  const response = await authClient.get<
    getClimbingRes,
    AxiosResponse<getClimbingRes>
  >(buildClimbUrl(`/${climbingId}`));
  return response.data;
};

/* 클라이밍 감상평 공유 */
export const patchShareClimbingReview = async (
  climbingId: number,
): Promise<void> => {
  const response = await authClient.patch<void, AxiosResponse<void>>(
    buildClimbUrl(`/${climbingId}/reviews`),
  );
  return response.data;
};

/* 클라이밍 감상평 이모지 추가 & 삭제 */
export const putClimbingReviewEmoji = async (
  climbingId: number,
  reviewId: number,
  emoji: string,
): Promise<void> => {
  const response = await authClient.put(
    buildClimbUrl(`/${climbingId}/reviews/${reviewId}/emojis/${emoji}`),
  );
  return response.data;
};

/* 클라이밍 채널 참여자 조회 */
export const getClimbingMembers = async (
  climbingId: number,
): Promise<getClimbingChannelMembersRes> => {
  const response = await authClient.get<
    getClimbingChannelMembersRes,
    AxiosResponse<getClimbingChannelMembersRes>
  >(buildClimbUrl(`/${climbingId}/members`));
  return response.data;
};

/* 클라이밍 모집 참여 <-> 취소 */
export const putParticipate = async (climbingId: number): Promise<void> => {
  const res = await authClient.put(`/climbs/${climbingId}/members`);
  return res.data;
};

/* 클라이밍 참여자 메모 수정 */
export const patchClimbingMemberMemo = async (
  climbingId: number,
  body: patchClimbingMemoReq,
): Promise<void> => {
  const response = await authClient.patch<
    void,
    AxiosResponse<void>,
    patchClimbingMemoReq
  >(buildClimbUrl(`/${climbingId}/members/memo`), body, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

/* 클라이밍 채널 감상평 공유 가능 여부/ 리스트 조회 (수정 필요) */
export const getClimbingReview = async (
  climbingId: number,
): Promise<getClimbingReviewRes> => {
  const response = await authClient.get<
    getClimbingReviewRes,
    AxiosResponse<getClimbingReviewRes>
  >(buildClimbUrl(`/${climbingId}/reviews`));
  return response.data;
};

/* 클라이밍 삭제 */
export const deleteClimbing = async (climbingId: number): Promise<void> => {
  const res = await authClient.delete(`/climbs/${climbingId}`);
  return res.data;
};

/* 클라이밍 채널 권한 위임 (수정 필요) */

/* 참여자 감상평 리스트 이모지 조회 */
export const getClimbingReviewEmojis = async (
  climbingId: number,
  reviewId: number,
): Promise<getClimbingReviewEmojiRes> => {
  const response = await authClient.get<
    getClimbingReviewEmojiRes,
    AxiosResponse<getClimbingReviewEmojiRes>
  >(buildClimbUrl(`/${climbingId}/reviews/${reviewId}/emojis`));
  return response.data;
};
