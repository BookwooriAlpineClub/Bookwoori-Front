import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { connectHandler, disconnectHandler } from '@src/apis/chat';
import type { DM } from '@src/types/messageRoom';
import type { ChatEventRes } from '@src/types/apis/chat';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetDMList, usePostMessageRoom } from '@src/hooks/query/chat';
import ChatBar from '@src/components/chatting/ChatBar';
import ChatItem from '@src/components/chatting/ChatItem';
import DateLine from '@src/components/common/DateLine';
import Header from '@src/components/common/Header';

const ChattingPage = () => {
  const { id: memberId } = useLoaderData<{ id: number }>();
  const { roomInfo } = usePostMessageRoom(memberId);
  const { data, fetchNextPage, hasNextPage, refetch } = useGetDMList(
    roomInfo?.messageRoomId ?? 0,
  );
  const [messages, setMessages] = useState<DM[]>([]);
  const [newMessages, setNewMessages] = useState<DM[]>([]);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const { ref: targetRef, inView } = useInView();
  const chatRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleRefresh = async () => {
    refetch();
    navigate(-1);
  };

  // 데이터 패칭
  useEffect(() => {
    if (!inView) return;

    if (hasNextPage) fetchNextPage();
    if (data) setMessages(data);
  }, [inView, hasNextPage]);

  // 최초 스크롤 하단 이동
  useEffect(() => {
    if (chatRef.current && messages.length > 0) {
      if (isInitial) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
        setIsInitial(false);
      }
    }
  }, [messages]);

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
          messageRoomId: message.payload.messageRoomId,
          memberId: message.payload.memberId,
          content: message.payload.content,
          createdAt: message.payload.createdAt,
          // reactions: {},
        };

        setNewMessages((prev) => [newMessage, ...prev]);
      }
    };

    // WebSocket 연결 (구독하고자 하는 url)
    connectHandler(onMessage, `/topic/direct/${roomInfo?.messageRoomId}`);

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      disconnectHandler();
    };
  }, [roomInfo, messages]);

  // 새로운 메시지 보냈을 때 스크롤 이동
  useEffect(() => {
    if (chatRef.current) {
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
      <Layout ref={chatRef}>
        <Container>
          {[...newMessages, ...messages].map((it, idx) => {
            const participant = roomInfo?.participants?.[String(it.memberId)];
            const currentDate = it.createdAt.split('T')[1]
              ? it.createdAt.split('T')[0]
              : it.createdAt.split(' ')[0];

            const prevDate = [...newMessages, ...messages][
              idx + 1
            ]?.createdAt.split('T')[1]
              ? [...newMessages, ...messages][idx + 1]?.createdAt.split('T')[0]
              : [...newMessages, ...messages][idx + 1]?.createdAt.split(' ')[0];

            const showDateLine = currentDate !== prevDate;

            return (
              <React.Fragment key={it.id}>
                <ChatItem
                  key={it.id}
                  chatItem={it}
                  createdAt={
                    it.createdAt.split('T')[1] || it.createdAt.split(' ')[1]
                  }
                  imgUrl={participant?.profileImg ?? undefined}
                  nickname={participant?.nickname ?? ''}
                />
                {(showDateLine) && <DateLine date={currentDate ?? ''} />}
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

const Layout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  padding-top: 4.375rem;
  padding-bottom: 4.4375rem;
  width: 100%;
  height: 100%;

  overflow: auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-top: auto;
`;
