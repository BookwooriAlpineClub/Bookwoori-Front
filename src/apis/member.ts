import { authClient } from '@src/apis/index';
import { ExpResponse, ProfileResponse } from '@src/types/domain/member';

const patchProfile = async (profileData: FormData) => {
  try {
    await authClient.patch('members/me', profileData, {
      headers: {
        'Contest-Type': 'multipart/form-data',
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

const getProfile = async (memberId: number): Promise<ProfileResponse> => {
  const res = await authClient.get(`members/${memberId}`);
  return res.data;
};

const getExp = async (): Promise<ExpResponse> => {
  const res = await authClient.get(`members/me/exp-log`);
  return res.data;
};

export { patchProfile, getProfile, getExp };
