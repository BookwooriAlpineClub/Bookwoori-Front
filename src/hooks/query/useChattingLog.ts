import { useInfiniteQuery } from '@tanstack/react-query';
import { getChannelMessages } from '@src/apis/channel';

const SIZE = 10;

const useChattingLog = (channelId: number) => {
  return useInfiniteQuery({
    queryKey: ['getChannelMessages', channelId],
    queryFn: ({ pageParam = 0 }) =>
      getChannelMessages(channelId, pageParam, SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.messages || lastPage.messages.length < SIZE) {
        return undefined;
      }

      const isLastPage = lastPage.messages.length < SIZE;
      return isLastPage ? undefined : allPages.length;
    },
  });
};

export default useChattingLog;
