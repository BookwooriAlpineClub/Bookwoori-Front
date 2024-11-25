import { getClimbingRecruitList, putParticipate } from '@src/apis/climbingTemp';
import { ClimbingRecruitListRes } from '@src/types/domain/climbingTemp';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useClimbingRecruit = (serverId: number) => {
  const { data, isLoading, isSuccess } = useQuery<
    ClimbingRecruitListRes,
    AxiosError
  >({
    queryKey: ['/climbs/ready', serverId],
    queryFn: () => getClimbingRecruitList(serverId),
  });

  const queryClient = useQueryClient();
  const participateClimbing = useMutation({
    mutationFn: (climbingId: number) => putParticipate(climbingId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['/climbs/ready'] }),
  });

  return {
    data: data?.readyClimbingList,
    isLoading,
    isSuccess,
    participateClimbing,
  };
};

export default useClimbingRecruit;
