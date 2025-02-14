import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ProfileRes } from '@src/types/apis/member';
import {
  getExp,
  getProfile,
  patchBackgroundImg,
  patchNickname,
  patchProfileImg,
} from '@src/apis/member';

export const useGetProfile = (userId: number | 'me') => {
  const { data } = useQuery<ProfileRes, AxiosError>({
    queryKey: ['getProfile', userId],
    queryFn: () => getProfile(userId),
    enabled: userId !== -1,
  });

  return { profileData: data };
};

export const usePatchProfile = () => {
  const queryClient = useQueryClient();

  const editNickname = useMutation({
    mutationFn: (nickname: string) => patchNickname({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile', 'me'] });
    },
  });

  const editProfileImg = useMutation({
    mutationFn: (formData: FormData) => patchProfileImg(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile', 'me'] });
    },
  });

  const editBackgroundImg = useMutation({
    mutationFn: (formData: FormData) => patchBackgroundImg(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile', 'me'] });
    },
  });

  return { editNickname, editProfileImg, editBackgroundImg };
};

export const useGetExp = () => {
  const { data } = useQuery({
    queryKey: ['getExp'],
    queryFn: () => getExp(),
  });

  return { data: data?.ExpLogList };
};
