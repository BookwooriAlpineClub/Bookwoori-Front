import { authClient } from '@src/apis/index';
import type {
  ExpRes,
  ProfilePatchReq,
  ProfileRes,
} from '@src/types/apis/member';

/* 프로필 수정 */
export const patchProfile = async <Res = void, Req = ProfilePatchReq>(
  body: Req,
): Promise<Res> => {
  const res = await authClient.patch(`members/me`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

/* 개별 프로필 조회 */
export const getProfile = async (
  memberId: number | 'me',
): Promise<ProfileRes> => {
  const res = await authClient.get(`members/${memberId}`);
  return res.data;
};

/* 경험치 내역 조회 */
export const getExp = async (): Promise<ExpRes> => {
  const res = await authClient.get(`members/me/exp-log`);
  return res.data;
};
