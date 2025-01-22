import { authClient } from '@src/apis/index';
import type {
  ExpRes,
  ProfilePatchReq,
  ProfileRes,
} from '@src/types/apis/member';

/* 프로필 수정 */
export const patchNickname = async <
  Res = void,
  Req = Pick<ProfilePatchReq, 'nickname'>,
>(
  body: Req,
): Promise<Res> => {
  const res = await authClient.patch(`members/me`, body);
  return res.data;
};

export const patchProfileImg = async <
  Res = void,
  Req = Pick<ProfilePatchReq, 'profileImg'>,
>(
  body: Req,
): Promise<Res> => {
  const res = await authClient.patch(`members/me/profileImg`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const patchBackgroundImg = async <
  Res = void,
  Req = Pick<ProfilePatchReq, 'backgroundImg'>,
>(
  body: Req,
): Promise<Res> => {
  const res = await authClient.patch(`members/me/backgroundImg`, body, {
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
