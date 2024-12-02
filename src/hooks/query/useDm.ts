import {
  getDmList,
  getMessageRoomList,
  postMessageRoom,
} from '@src/apis/messageRoom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useRoomInfo = (memberId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['postMessageRoom', memberId],
    queryFn: () => postMessageRoom({ memberId }),
  });

  return { roomInfo: data, isLoading };
};

const itemsPerPage = 10;

export const useDm = () => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['getMessageRoomList'],
      queryFn: ({ pageParam = 0 }) =>
        getMessageRoomList(pageParam, itemsPerPage),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length;
        return lastPage?.messageRooms.length < itemsPerPage
          ? undefined
          : nextPage;
      },
      initialPageParam: 0,
    });

  return {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

const messagesPerPage = 10;

export const useMessage = (messageRoomId: number) => {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['getDMList', messageRoomId],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getDmList(
        messageRoomId,
        pageParam,
        messagesPerPage,
      );
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage?.messages.length < messagesPerPage ? undefined : nextPage;
    },
    initialPageParam: 0,
  });

  const messages = data?.pages.flatMap((page) => page.messages) || [];

  return {
    data,
    messages,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
