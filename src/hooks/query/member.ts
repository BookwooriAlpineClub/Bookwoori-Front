import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ProfileRes } from '@src/types/apis/member';
import { getProfile, patchProfile } from '@src/apis/member';

export const useGetProfile = (userId: number | 'me') => {
  const { data } = useQuery<ProfileRes, AxiosError>({
    queryKey: ['getProfile', userId],
    queryFn: () => getProfile(userId),
  });

  return { profileData: data };
};

export const usePatchProfile = () => {
  const queryClient = useQueryClient();

  const editProfile = useMutation({
    mutationFn: (formData: FormData) => patchProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile', 'me'] });
      window.location.reload();
    },
  });

  return { editProfile };
};
