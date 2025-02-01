import styled from 'styled-components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  editChatIdState,
  replyChatIdState,
  replyChatState,
} from '@src/states/atoms';
import { useInView } from 'react-intersection-observer';
import type { DM } from '@src/types/messageRoom';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetDMList, usePostMessageRoom } from '@src/hooks/query/chat';
import useChatHandler from '@src/hooks/useChatHandler';
import { formatCreatedAt } from '@src/utils/formatters';
import ChatBar from '@src/components/chatting/ChatBar';
import ChatItem from '@src/components/chatting/ChatItem';
import DateLine from '@src/components/common/DateLine';
import Header from '@src/components/common/Header';

const ChattingPage = () => {
  const { id: memberId } = useLoaderData<{ id: number }>();
  const setEditChatId = useSetRecoilState(editChatIdState);
  const [replyChatItem, setReplyChatItem] = useRecoilState(replyChatState);
  const { roomInfo } = usePostMessageRoom(memberId);
  const { data, fetchNextPage, hasNextPage, refetch } = useGetDMList(
    roomInfo?.messageRoomId ?? -1,
  );
  const [messages, setMessages] = useState<DM[]>([]);
  const [newMessages, setNewMessages] = useState<DM[]>([]);
  useChatHandler({ roomInfo, setNewMessages, setMessages });
  const allMessages: DM[] = useMemo(() => {
    return [...newMessages, ...messages];
  }, [newMessages, messages]);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const { ref: targetRef, inView } = useInView();
  const chatRef = useRef<HTMLDivElement>(null);
  const replyChatRef = useRef<HTMLDivElement | null>(null);
  const replyChatId = useRecoilValue(replyChatIdState);

  const navigate = useNavigate();

  const handleRefresh = async () => {
    setEditChatId(null);
    setReplyChatItem(null);
    refetch();
    navigate(-1);
  };

  useEffect(() => {
    if (replyChatRef.current) {
      replyChatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [replyChatId]);

  useEffect(() => {
    if (!data) return;

    if (isInitial) {
      setMessages(data);
      setIsInitial(false);

      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [data]);

  // 데이터 패칭
  useEffect(() => {
    if (!inView) return;

    if (hasNextPage) fetchNextPage();
    if (data) setMessages(data);
  }, [inView, hasNextPage]);

  // 새로운 메시지 보냈을 때 스크롤 이동
  const prevMessageCount = useRef(newMessages.length);

  useEffect(() => {
    if (!chatRef.current) return;

    const isNewMessageAdded = newMessages.length > prevMessageCount.current;
    prevMessageCount.current = newMessages.length;

    if (isNewMessageAdded) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [newMessages]);

  return (
    <>
      <Header
        text={roomInfo?.title ?? ''}
        headerType='back'
        onClick={handleRefresh}
      />
      <Layout ref={chatRef} $isExistReply={Boolean(replyChatItem)}>
        <Container>
          {allMessages.map((it, idx) => {
            const participant = roomInfo?.participants?.[String(it.memberId)];
            const prevMessage = [...newMessages, ...messages][idx + 1];
            const { date: prevDate } = prevMessage
              ? formatCreatedAt(prevMessage.createdAt)
              : { date: null };
            const { date: currentDate, time: currentTime } = formatCreatedAt(
              it.createdAt,
            );
            const showDateLine = prevDate !== currentDate;

            return (
              <React.Fragment key={it.id}>
                <ChatItem
                  ref={it.id === replyChatId ? replyChatRef : null}
                  key={it.id}
                  chatItem={it}
                  createdAt={currentTime}
                  imgUrl={participant?.profileImg ?? undefined}
                  nickname={participant?.nickname ?? ''}
                />
                {showDateLine && <DateLine date={currentDate} />}
              </React.Fragment>
            );
          })}
          <div ref={targetRef} />
        </Container>
      </Layout>
      <ChatBar nickname={roomInfo?.title ?? ''} />
    </>
  );
};

export default ChattingPage;

const Layout = styled.div<{ $isExistReply: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;

  padding-top: 4.375rem;
  padding-bottom: ${({ $isExistReply }) =>
    $isExistReply ? '8.0625rem' : '4.4375rem'};
  width: 100%;
  height: 100%;

  overflow: auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: auto;
`;
