import { authClient } from '@src/apis/index';
import { ExpResponse, ProfileResponse } from '@src/types/domain/member';

/* 프로필 수정 */
export const patchProfile = async (body: FormData) => {
  const res = await authClient.patch(`members/me`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

/* 개별 프로필 조회 */
export const getProfile = async (
  memberId?: number | null,
): Promise<ProfileResponse> => {
  const res = await authClient.get(`members/${memberId ?? 'me'}`);
  return res.data;
};

/* 경험치 내역 조회 */
export const getExp = async (): Promise<ExpResponse> => {
  const res = await authClient.get(`members/me/exp-log`);
  return res.data;
};
