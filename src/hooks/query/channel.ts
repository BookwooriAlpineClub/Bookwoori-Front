import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';
import type { ChannelPostReq } from '@src/types/apis/channel';
import type { CategoryRes } from '@src/types/apis/category';
import type { ClimbingList } from '@src/types/climbing';
import {
  deleteChannel,
  getChannelMessages,
  patchChannel,
  postChannel,
} from '@src/apis/channel';
import { getServerChannels, getServerClimbing } from '@src/apis/server';

export const useGetServerChannel = () => {
  const serverId = useRecoilValue(currentServerIdState);

  const { data } = useQuery<CategoryRes, AxiosError>({
    queryKey: ['getServerChannels', serverId],
    queryFn: () => getServerChannels(serverId as number),
    enabled: serverId !== -1,
  });

  return { channels: data?.categories };
};

export const useGetServerClimbing = () => {
  const serverId = useRecoilValue(currentServerIdState);

  const { data: climbingList } = useQuery<ClimbingList, AxiosError>({
    queryKey: ['getServerClimbing', serverId],
    queryFn: () => getServerClimbing(serverId as number),
    enabled: serverId !== -1,
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

const MESSAGE_PER_PAGE = 10;

export const useGetChannelMessages = (channelId: number) => {
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['getChannelMessages', channelId],
    queryFn: ({ pageParam = 0 }) =>
      getChannelMessages(channelId, pageParam, MESSAGE_PER_PAGE),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage?.messages.length < MESSAGE_PER_PAGE
        ? undefined
        : nextPage;
    },
    retry: 0,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialPageParam: 0,
  });

  return {
    data: data?.pages.flatMap((page) => page.messages),
    fetchNextPage,
    hasNextPage,
    refetch,
  };
};
