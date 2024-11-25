import {
  getClimbingRecruitList,
  getParticipants,
  putParticipate,
} from '@src/apis/climbingTemp';
import {
  ClimbingParticipantsRes,
  ClimbingRecruitListRes,
} from '@src/types/domain/climbingTemp';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useClimbingRecruit = (id: number) => {
  const { data, isLoading, isSuccess } = useQuery<
    ClimbingRecruitListRes,
    AxiosError
  >({
    queryKey: ['/climbs/ready', id],
    queryFn: () => getClimbingRecruitList(id),
  });

  const { data: participants } = useQuery<ClimbingParticipantsRes, AxiosError>({
    queryKey: ['/climbs/member', id],
    queryFn: () => getParticipants(id),
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
    participants,
    participateClimbing,
  };
};

export default useClimbingRecruit;
