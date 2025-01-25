import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';
import type { ChannelPostReq } from '@src/types/apis/channel';
import type { CategoryRes } from '@src/types/apis/category';
import type { ClimbingList } from '@src/types/climbing';
import { deleteChannel, patchChannel, postChannel } from '@src/apis/channel';
import { getServerChannels, getServerClimbing } from '@src/apis/server';

export const useGetServerChannel = () => {
  const serverId = useRecoilValue(currentServerIdState);

  const { data } = useQuery<CategoryRes, AxiosError>({
    queryKey: ['getServerChannels', serverId],
    queryFn: () => getServerChannels(serverId as number),
  });

  return { channels: data?.categories };
};

export const useGetServerClimbing = () => {
  const serverId = useRecoilValue(currentServerIdState);

  const { data: climbingList } = useQuery<ClimbingList, AxiosError>({
    queryKey: ['getServerClimbing', serverId],
    queryFn: () => getServerClimbing(serverId as number),
  });

  return { climbingList };
};

export const usePostChannel = () => {
  const createChannel = useMutation({
    mutationFn: ({ body }: { body: ChannelPostReq }) => postChannel(body),
  });

  return { createChannel };
};

export const usePatchChannel = () => {
  const editChannel = useMutation({
    mutationFn: ({
      channelId,
      body,
    }: {
      channelId: number;
      body: { categoryId: number; name: string };
    }) => patchChannel(channelId, body),
  });

  return { editChannel };
};

export const useDeleteChannel = () => {
  const delChannel = useMutation({
    mutationFn: (channelId: number) => deleteChannel(channelId),
  });

  return { delChannel };
};
