import {
  getClimbingRecruitList,
  patchClimbing,
  putParticipate,
} from '@src/apis/climbingTemp';
import {
  ClimbingEditReq,
  ClimbingRecruitItem,
  ClimbingRecruitListRes,
} from '@src/types/domain/climbingTemp';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useClimbingRecruit = (serverId: number, climbingId?: number) => {
  const { data, isLoading, isSuccess } = useQuery<
    ClimbingRecruitListRes,
    AxiosError
  >({
    queryKey: ['/climbs/ready', serverId],
    queryFn: () => getClimbingRecruitList(serverId),
  });

  const {
    data: readyClimbingInfo,
    isLoading: infoLoading,
    isFetching,
  } = useQuery<
    ClimbingRecruitListRes,
    AxiosError,
    ClimbingRecruitItem | undefined
  >({
    queryKey: ['/climbs/ready', serverId],
    queryFn: () => getClimbingRecruitList(serverId),
    select: (getData) =>
      getData.readyClimbingList.find((item) => item.climbingId === climbingId),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const queryClient = useQueryClient();
  const participateClimbing = useMutation({
    mutationKey: ['putParticipate'],
    mutationFn: () => putParticipate(climbingId ?? 0),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['/climbs/ready'] }),
  });

  const editClimbing = useMutation({
    mutationKey: ['patchClimbing'],
    mutationFn: (body: ClimbingEditReq) => patchClimbing(climbingId ?? 0, body),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['/climbs/ready', serverId, climbingId],
      }),
  });

  return {
    data: data?.readyClimbingList,
    isLoading,
    isSuccess,
    readyClimbingInfo,
    infoLoading,
    isFetching,
    participateClimbing,
    editClimbing,
  };
};

export default useClimbingRecruit;
