import useLoaderData from '@src/hooks/useRoaderData';
import Header from '@src/components/common/Header';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CategoriesRes } from '@src/types/domain/category';
import { AxiosError } from 'axios';
import { getServerChannels } from '@src/apis/server';
import styled from 'styled-components';
import useChattingLog from '@src/hooks/query/useChattingLog';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import { ChannelMessage } from '@src/types/domain/channel';
import DateLine from '@src/components/chatting/DateLine';
import ChatItem from '@src/components/chatting/ChatItem';
import ChannelChatBar from '@src/components/channel/ChannelChatBar';
import { connectHandler, disconnectHandler } from '@src/apis/chat';
import { ChatEvent } from '@src/types/domain/dm';

function preprocess(data: ChannelMessage[]) {
  const result: {
    [date in string]: ChannelMessage[];
  } = {};

  const seenIds = new Set<string>();
  const parseDate = (dateTimeString: string) => dateTimeString.slice(0, 11);

  data.forEach((chat) => {
    const dateKey = parseDate(chat.createdAt);

    if (seenIds.has(chat.id)) {
      return;
    }
    seenIds.add(chat.id);

    result[dateKey] ??= [];
    result[dateKey].push(chat);
  });

  return result;
}

const ChannelPage = () => {
  // params 받아오기
  const { id: serverId } = useLoaderData<{ id: number }>();
  const { channelId: stringChannel } = useParams<{ channelId: string }>();
  const channelId = Number(stringChannel);

  // channelName 받아오기
  const {
    data: channelName,
    isLoading,
    error,
  } = useQuery<string, AxiosError>({
    queryKey: ['channelName', channelId, serverId],
    queryFn: async () => {
      const data = await getServerChannels<CategoriesRes>(serverId);
      const matchChannel = data.categories
        .flatMap((category) => category.channels)
        .find((channel) => channel.channelId === channelId);
      if (matchChannel) {
        return matchChannel.name;
      }
      throw new Error('Channel not found');
    },
  });

  // chatting data 받아오기
  const { data, fetchNextPage, hasNextPage } = useChattingLog(channelId);

  // mount 관리
  const [mounted, setMounted] = useState(false);

  const { ref } = useInView({
    onChange: (inView) => {
      if (!mounted || totalMessageCount <= 8) {
        return;
      }
      if (!hasNextPage) {
        return;
      }
      if (!inView) {
        return;
      }
      fetchNextPage();
    },
  });

  const [chattings, setChattings] = useState<{
    [date: string]: ChannelMessage[];
  }>({});
  useEffect(() => {
    if (data) {
      setChattings(
        preprocess(data.pages.flatMap((page) => page.messages) || []),
      );
    }
  }, [data]);

  const totalMessageCount = Object.values(chattings).reduce(
    (count, group) => count + group.length,
    0,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    container.scrollTop = container.scrollHeight - container.clientHeight;
  }, [chattings]);

  useEffect(() => {
    const onMessage = (message: ChatEvent) => {
      if (message.eventType === 'NEW_MESSAGE') {
        const newMessage: ChannelMessage = {
          id: message.payload.id,
          channelId: message.payload.channelId || 0,
          memberId: message.payload.memberId,
          content: message.payload.content,
          createdAt: message.payload.createdAt,
        };

        setChattings((prevChattings) => {
          const dateKey = newMessage.createdAt.slice(0, 11);
          const updatedChattings = { ...prevChattings };

          if (!updatedChattings[dateKey]) {
            updatedChattings[dateKey] = [];
          }

          if (
            !updatedChattings[dateKey].some((msg) => msg.id === newMessage.id)
          ) {
            updatedChattings[dateKey].push(newMessage);
          }

          return updatedChattings;
        });
      }
    };
    connectHandler(onMessage, `/topic/channel/${channelId}`);
    return () => {
      disconnectHandler();
    };
  }, [channelId]);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1000);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(chattings);
  return (
    <>
      <SHeader text={channelName ?? ''} headerType='back' />
      <Container ref={containerRef}>
        {totalMessageCount > 8 && (
          <div
            ref={ref}
            style={{ backgroundColor: 'orange', height: '20px' }}
          />
        )}
        {Object.entries(chattings)
          .sort((a, b) => (a[0] < b[0] ? 1 : -1))
          .map((date) => (
            <>
              <DateLine date={`${date[0].split('T')[0]}`} />
              {date[1]
                .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                .map((it) => (
                  <ChatItem
                    key={it.id}
                    chatItem={it}
                    createdAt={it.createdAt.split('T')[1]}
                    imgUrl=''
                    nickname='ncik'
                  />
                ))}
            </>
          ))}
      </Container>
      <ChannelChatBar channelName={channelName ?? ''} channelId={channelId} />
    </>
  );
};

export default ChannelPage;

const SHeader = styled(Header)`
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 70px);

  overflow: auto;

  // scroll

  &::-webkit-scrollbar {
    width: 10px;
  }
`;
