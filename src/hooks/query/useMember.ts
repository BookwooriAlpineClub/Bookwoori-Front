import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile, patchProfile } from '@src/apis/member';
import { ProfileResponse } from '@src/types/domain/member';
import { deleteAccount } from '@src/apis/auth';
import { ROUTE_PATH } from '@src/constants/routePath';

const useMember = (userId: number) => {
  const {
    data: profileData,
    isLoading,
    isError,
    isSuccess
  } = useQuery<
    ProfileResponse,
    AxiosError
  >({
    queryKey: ['/members', userId],
    queryFn: () => getProfile(userId), // 유저 본인 프로필 조회 api도 사용가능 하도록 수정 예정
  });

  const queryClient = useQueryClient();
  const editProfile = useMutation({
    mutationFn: (formData: FormData) => patchProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/members'] });
      window.location.reload();
    },
  });

  const delAccount = useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => window.location.replace(ROUTE_PATH.root),
  });

  return {
    profileData,
    isLoading,
    isError,
    isSuccess,
    editProfile,
    delAccount
  };
};

export default useMember;
