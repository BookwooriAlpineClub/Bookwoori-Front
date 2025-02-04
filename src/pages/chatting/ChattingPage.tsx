import styled from 'styled-components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
import DateLine from '@src/components/chatting/DateLine';
import Header from '@src/components/common/Header';

const ChattingPage = () => {
  const { id: memberId } = useLoaderData<{ id: number }>();
  const setEditChatId = useSetRecoilState(editChatIdState);
  const setReplyChatItem = useSetRecoilState(replyChatState);
  const replyChatId = useRecoilValue(replyChatIdState);

  const { roomInfo } = usePostMessageRoom(memberId);
  const { data, refetch, hasNextPage, fetchNextPage } = useGetDMList(
    roomInfo?.messageRoomId ?? -1,
  );

  const [messages, setMessages] = useState<DM[]>([]);
  const [newMessages, setNewMessages] = useState<DM[]>([]);
  const allMessages: DM[] = useMemo(() => {
    return [...newMessages, ...messages];
  }, [newMessages, messages]);
  const [isInitial, setIsInitial] = useState<boolean>(true);

  const { ref: targetRef, inView } = useInView();
  const chatRef = useRef<HTMLDivElement>(null);
  const replyChatRef = useRef<HTMLDivElement | null>(null);

  useChatHandler({ roomInfo, setNewMessages, setMessages });

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

  // 최초 데이터 저장
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
  }, [data, isInitial]);

  // 페이지 패칭
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
      <Main ref={chatRef}>
        <Container>
          {allMessages.map((it, idx) => {
            const prevMessage = allMessages[idx + 1];
            const { date: prevDate } = prevMessage
              ? formatCreatedAt(prevMessage.createdAt)
              : { date: null };
            const { date: currentDate, time: currentTime } = formatCreatedAt(
              it.createdAt,
            );
            const showDateLine = hasNextPage ? false : prevDate !== currentDate;

            return (
              <React.Fragment key={it.id}>
                <ChatItem
                  ref={it.id === replyChatId ? replyChatRef : null}
                  key={it.id}
                  chatItem={it}
                  createdAt={currentTime}
                />
                {showDateLine && <DateLine date={currentDate} />}
              </React.Fragment>
            );
          })}
          <div ref={targetRef} />
        </Container>
      </Main>
      <ChatBar nickname={roomInfo?.title ?? ''} />
    </>
  );
};

export default ChattingPage;

const Main = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;

  padding-bottom: 4.5625rem;
  width: 100%;
  height: 100%;

  overflow: auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: auto;
`;
