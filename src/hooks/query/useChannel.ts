import { deleteChannel, patchChannel } from '@src/apis/channelTemp';
import { getServerChannels, getServerClimbing } from '@src/apis/server';
import { CategoriesRes } from '@src/types/domain/category';
import { ClimbingListRes } from '@src/types/domain/climbingTemp';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useChannel = (serverId: number) => {
  const { data: channels } = useQuery<CategoriesRes, AxiosError>({
    queryKey: ['getServerChannels', serverId],
    queryFn: () => getServerChannels(serverId),
  });

  const { data: climbingList } = useQuery<ClimbingListRes, AxiosError>({
    queryKey: ['getServerClimbing', serverId],
    queryFn: () => getServerClimbing(serverId),
  });

  const editChannel = useMutation({
    mutationFn: ({
      channelId,
      body,
    }: {
      channelId: number;
      body: { categoryId: number; name: string };
    }) => patchChannel(channelId, body),
  });

  const delChannel = useMutation({
    mutationFn: (channelId: number) => deleteChannel(channelId),
  });

  return {
    channels: channels?.categories,
    climbingList,
    editChannel,
    delChannel,
  };
};

export default useChannel;
