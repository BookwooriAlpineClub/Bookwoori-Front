import useLoaderData from '@src/hooks/useRoaderData';
import Header from '@src/components/common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { CategoryRes } from '@src/types/apis/category';
import type { ChannelMessage } from '@src/types/channel';
import { AxiosError } from 'axios';
import { getServerChannels } from '@src/apis/server';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGetChannelMessages } from '@src/hooks/query/channel';
import { formatCreatedAt } from '@src/utils/formatters';
import ChatItem from '@src/components/chatting/ChatItem';
import DateLine from '@src/components/chatting/DateLine';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  editChatIdState,
  replyChatIdState,
  replyChatState,
} from '@src/states/atoms';
import ChannelChatBar from '@src/components/chatting/ChannelChatBar';
import useChannelChatHandler from '@src/hooks/useChannelChatHandler';
import Spinner from '@src/components/common/Spinner';

const ChannelPage = () => {
  // params 받아오기 (serverId, channelId)
  const { id: serverId } = useLoaderData<{ id: number }>();
  const { channelId: stringChannel } = useParams<{ channelId: string }>();
  const channelId = Number(stringChannel);

  const setEditChatId = useSetRecoilState(editChatIdState);
  const setReplyChatItem = useSetRecoilState(replyChatState);
  const replyChatId = useRecoilValue(replyChatIdState);

  // channelName 받아오기 (수정 필요)
  const {
    data: channelName,
    isLoading,
    error,
  } = useQuery<string, AxiosError>({
    queryKey: ['channelName', channelId, serverId],
    queryFn: async () => {
      const data = await getServerChannels<CategoryRes>(serverId);
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
  const { data, fetchNextPage, hasNextPage, refetch } =
    useGetChannelMessages(channelId);

  const [messages, setMessages] = useState<ChannelMessage[]>([]);
  const [newMessages, setNewMessages] = useState<ChannelMessage[]>([]);
  const allMessages: ChannelMessage[] = useMemo(() => {
    return [...newMessages, ...messages];
  }, [newMessages, messages]);
  const [isInitial, setIsInitial] = useState(true);

  const { ref: targetRef, inView } = useInView();
  const chatRef = useRef<HTMLDivElement>(null);
  const replyChatRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleRefresh = async () => {
    setEditChatId(null);
    setReplyChatItem(null);
    refetch();
    navigate(-1);
  };

  useEffect(() => {
    if (!isInitial) return;
    if (!data) return;
    setMessages(data);
    setIsInitial(false);
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 0);
  }, [isInitial, data]);

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;

    const prevHeight = chatRef.current?.scrollHeight ?? 0;
    fetchNextPage().then(() => {
      if (!data) return;
      setMessages(data);

      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight - prevHeight;
        }
      }, 0);
    });
  }, [inView, hasNextPage]);

  const prevMessageCount = useRef(newMessages.length);

  useEffect(() => {
    if (!chatRef.current) return;

    const isNewMessageAdded = newMessages.length > prevMessageCount.current;
    prevMessageCount.current = newMessages.length;

    if (isNewMessageAdded) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [newMessages]);

  useChannelChatHandler({ channelId, setNewMessages, setMessages });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header
        text={channelName ?? ''}
        headerType='back'
        onClick={handleRefresh}
      />
      <Main ref={chatRef}>
        <Container>
          {allMessages.map((msg, idx) => {
            const prevMessage = allMessages[idx + 1];
            const { date: prevData } = prevMessage
              ? formatCreatedAt(prevMessage.createdAt)
              : { date: null };
            const { date: currentDate, time: currentTime } = formatCreatedAt(
              msg.createdAt,
            );
            const showDateLine = hasNextPage ? false : prevData !== currentDate;

            return (
              <React.Fragment key={msg.id}>
                <ChatItem
                  ref={msg.id === replyChatId ? replyChatRef : null}
                  key={msg.id}
                  chatItem={msg}
                  createdAt={currentTime}
                />
                {showDateLine && <DateLine date={currentDate} />}
              </React.Fragment>
            );
          })}
          <div ref={targetRef} />
        </Container>
      </Main>
      <ChannelChatBar nickname={channelName ?? ''} />
    </>
  );
};

export default ChannelPage;

const Main = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;

  width: 100%;
  height: 100%;

  overflow-y: auto;
  padding-bottom: 4.5625rem;

  &::-webkit-scrollbar {
    width: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: auto;
`;
