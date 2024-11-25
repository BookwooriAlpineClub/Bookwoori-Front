import { getParticipants } from '@src/apis/climbingTemp';
import { ClimbingParticipantsRes } from '@src/types/domain/climbingTemp';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useClimbing = (climbingId: number) => {
  const { data: participants } = useQuery<ClimbingParticipantsRes, AxiosError>({
    queryKey: ['/climbs/member', climbingId],
    queryFn: () => getParticipants(climbingId),
  });

  return {
    participants: participants?.climbingMemberList,
  };
};

export default useClimbing;
