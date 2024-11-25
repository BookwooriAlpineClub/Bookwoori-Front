import { authClient } from '@src/apis/index';
import {
  ClimbingParticipantsRes,
  ClimbingRecruitListRes,
} from '@src/types/domain/climbingTemp';

/* 메모 수정 */
export const patchMemo = async (climbingId: number) => {
  const res = await authClient.patch(`/climbs/${climbingId}/members/memo`);
  return res.data;
};

/* 참여자 조회 */
export const getParticipants = async (
  climbingId: number,
): Promise<ClimbingParticipantsRes> => {
  const res = await authClient.get(`/climbs/${climbingId}/members`);
  return res.data;
};

/* 클라이밍 모집 참여 <-> 취소 */
export const putParticipate = async (climbingId: number) => {
  const res = await authClient.put(`/climbs/${climbingId}/members`);
  return res.data;
};

/* 클라이밍 채널 정보 조회 */
export const getClimbingInfo = async (climbingId: number) => {
  const res = await authClient.get(`/climbs/${climbingId}`);
  return res.data;
};

/* 클라이밍 채널 편집 */
export const patchClimbing = async (climbingId: number) => {
  const res = await authClient.patch(`/climbs/${climbingId}`);
  return res.data;
};

/* 모집 중인 클라이밍 채널 목록 조회 */
export const getClimbingRecruitList = async (
  serverId: number,
): Promise<ClimbingRecruitListRes> => {
  const res = await authClient.get(`/servers/${serverId}/climbs/ready`);
  return res.data;
};