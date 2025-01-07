import type { ChannelPostReq } from '@src/types/apis/channel';
import { postChannel, deleteChannel, patchChannel } from '@src/apis/channel';
import type { ClimbingListRes } from '@src/types/domain/climbingTemp';
import { getServerChannels, getServerClimbing } from '@src/apis/server';
import { CategoryRes } from '@src/types/apis/category';
import { useMutation, useQuery } from '@tanstack/react-query';
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

  const createChannel = useMutation({
    mutationFn: ({ body }: { body: ChannelPostReq }) => postChannel(body),
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
    createChannel,
    editChannel,
    delChannel,
  };
};

export default useChannel;
