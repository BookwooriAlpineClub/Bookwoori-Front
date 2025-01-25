import type { ClimbingListRes } from '@src/types/domain/climbingTemp';
import { getServerChannels, getServerClimbing } from '@src/apis/server';
import { CategoryRes } from '@src/types/apis/category';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useChannel = (serverId?: number) => {
  const { data: channels } = useQuery<CategoryRes, AxiosError>({
    queryKey: ['getServerChannels', serverId],
    queryFn: () => getServerChannels(serverId as number),
  });

  const { data: climbingList } = useQuery<ClimbingListRes, AxiosError>({
    queryKey: ['getServerClimbing', serverId],
    queryFn: () => getServerClimbing(serverId as number),
  });

  return {
    channels: channels?.categories,
    climbingList,
  };
};

export default useChannel;
