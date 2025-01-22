import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { connectHandler, disconnectHandler } from '@src/apis/chat';
import type { DM } from '@src/types/messageRoom';
import type { ChatEventRes } from '@src/types/apis/chat';
import useLoaderData from '@src/hooks/useRoaderData';
import { useMessage, useRoomInfo } from '@src/hooks/query/useDm';
import ChatBar from '@src/components/chatting/ChatBar';
import ChatItem from '@src/components/chatting/ChatItem';
import DateLine from '@src/components/common/DateLine';
import Header from '@src/components/common/Header';
import LoadingPage from '@src/pages/fallback/LoadingPage';

const ChattingPage = () => {
  const { id: memberId } = useLoaderData<{ id: number }>();
  const { roomInfo } = useRoomInfo(memberId);
  const [roomId, setRoomId] = useState<number>();
  const {
    messages: data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useMessage(roomId ?? -1);
  const [messages, setMessages] = useState<DM[]>([]);
  const [prevHeight, setPrevHeight] = useState<number>(-1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const targetRef = useRef<any>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // 데이터 fetching
  useEffect(() => {
    if (data) {
      const uniqueMessages = data.filter(
        (newMessage) => !messages.some((msg) => msg.id === newMessage.id),
      );

      // 기존 메시지에 새로운 메시지만 추가
      if (uniqueMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...uniqueMessages]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (roomInfo && roomInfo.messageRoomId !== roomId) {
      setRoomId(roomInfo.messageRoomId);
    }
  }, [roomInfo]);

  useEffect(() => {
    // 메시지 핸들러 정의 (새로운 메시지가 도착할 때 호출)
    const onMessage = (message: ChatEventRes) => {
      if (message.messageRoomId !== roomInfo!.messageRoomId) return;
      if (message.eventType === 'REACT') {
        console.log('반응');
      }

      if (
        message.eventType === 'NEW_MESSAGE' &&
        'messageRoomId' in message.payload
      ) {
        const newMessage: DM = {
          id: message.payload.id,
          messageRoomId: message.payload.messageRoomId || 0,
          memberId: message.payload.memberId,
          content: message.payload.content ?? '',
          createdAt: message.payload.createdAt,
          // reactions: {},
        };
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg.id === newMessage.id)) {
            return prevMessages;
          }
          return [newMessage, ...prevMessages];
        });

        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }
    };

    // WebSocket 연결 (구독하고자 하는 url)
    connectHandler(onMessage, `/topic/direct/${roomInfo?.messageRoomId}`);

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      disconnectHandler();
    };
  }, [roomInfo]);

  // 옵저버
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          setPrevHeight(chatRef.current?.scrollHeight || prevHeight);
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );

    const targetElement = targetRef.current;
    if (targetElement) observer.observe(targetElement);

    return () => {
      if (targetElement) observer.unobserve(targetElement);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, targetRef]);

  useEffect(() => {
    // 처음 채팅방 접속시 스크롤 하단 이동
    if (prevHeight === -1 && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (!data || isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Header text={roomInfo?.title ?? ''} headerType='back' />
      <SLayout ref={chatRef}>
        <div ref={targetRef} />
        <Container>
          {messages.map((it, idx) => {
            const participant = roomInfo?.participants?.[String(it.memberId)];
            const imgUrl = participant?.profileImg || undefined;
            const nickname = participant?.nickname || '';
            const currentDate = it.createdAt.split('T')[1]
              ? it.createdAt.split('T')[0]
              : it.createdAt.split(' ')[0];

            const prevDate = messages[idx - 1]?.createdAt.split('T')[1]
              ? messages[idx - 1]?.createdAt.split('T')[0]
              : messages[idx - 1]?.createdAt.split(' ')[0];

            const showDateLine = currentDate !== prevDate;

            return (
              <React.Fragment key={it.id}>
                <ChatItem
                  key={it.id}
                  chatItem={it}
                  createdAt={
                    it.createdAt.split('T')[1] || it.createdAt.split(' ')[1]
                  }
                  imgUrl={imgUrl}
                  nickname={nickname}
                />
                {showDateLine ||
                  ((idx === messages.length - 1 || idx === 0) && (
                    <DateLine date={currentDate ?? ''} />
                  ))}
              </React.Fragment>
            );
          })}
        </Container>
      </SLayout>
      <ChatBar nickname={roomInfo?.title ?? ''} />
    </>
  );
};

export default ChattingPage;

const SLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  padding-top: 70px;
  width: 100%;
  height: calc(100% - 70px);

  overflow: auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: auto;
`;
