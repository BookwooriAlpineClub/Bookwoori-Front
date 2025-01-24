import {
  getDmList,
  getMessageRoomList,
  postMessageRoom,
} from '@src/apis/messageRoom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const ITEMS_PER_PAGE = 10;
const MESSAGE_PER_PAGE = 10;

export const usePostMessageRoom = (memberId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['postMessageRoom', memberId],
    queryFn: () => postMessageRoom({ memberId }),
  });

  return { roomInfo: data, isLoading };
};

export const useGetMessageRoomList = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['getMessageRoomList'],
      queryFn: ({ pageParam = 0 }) =>
        getMessageRoomList(pageParam, ITEMS_PER_PAGE),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return lastPage?.messageRooms.length < ITEMS_PER_PAGE
          ? undefined
          : nextPage;
      },
      initialPageParam: 0,
    });

  return {
    data: data?.pages,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

export const useGetDMList = (messageRoomId: number) => {
  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['getDMList', messageRoomId],
    queryFn: ({ pageParam = 0 }) =>
      getDmList(messageRoomId, pageParam, MESSAGE_PER_PAGE),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
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
    data: data?.pages.map((page) => page.messages).flat(),
    fetchNextPage,
    refetch,
    hasNextPage,
  };
};
