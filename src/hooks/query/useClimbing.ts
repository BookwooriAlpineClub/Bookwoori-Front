import type { Climbing } from '@src/types/apis/climbing';
import { getClimbing, postClimbing } from '@src/apis/climbing';
import { getParticipants } from '@src/apis/climbingTemp';
import type {
  ClimbingParticipantsRes,
  ClimbingRecruitItem,
} from '@src/types/domain/climbingTemp';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type A = Pick<Climbing, 'name' | 'description' | 'startDate' | 'endDate'> & {
  serverId: number;
  isbn: string;
};

const useClimbing = (climbingId?: number) => {
  const { data: participants } = useQuery<ClimbingParticipantsRes, AxiosError>({
    queryKey: ['/climbs/member', climbingId],
    queryFn: () => getParticipants(climbingId as number),
  });

  const createClimbing = useMutation({
    mutationFn: ({ body }: { body: A }) => postClimbing(body),
  });

  const { data: climbingInfo, isLoading } = useQuery<ClimbingRecruitItem, AxiosError>({
    queryKey: ['getClimbing', climbingId],
    queryFn: () => getClimbing(climbingId as number),
  });

  return {
    participants: participants?.climbingMemberList,
    createClimbing,
    climbingInfo,
    isLoading
  };
};

export default useClimbing;
