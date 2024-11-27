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

  const { data: readyClimbingInfo } = useQuery<
    ClimbingRecruitListRes,
    AxiosError,
    ClimbingRecruitItem | undefined
  >({
    queryKey: ['/climbs/ready', serverId, climbingId],
    queryFn: () => getClimbingRecruitList(serverId),
    select: (getData) =>
      getData.readyClimbingList.find((item) => item.climbingId === climbingId),
  });

  const queryClient = useQueryClient();
  const participateClimbing = useMutation({
    mutationFn: () => putParticipate(climbingId ?? 0),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['/climbs/ready'] }),
  });

  const editClimbing = useMutation({
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
    participateClimbing,
    editClimbing,
  };
};

export default useClimbingRecruit;
