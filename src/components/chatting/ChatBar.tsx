import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { replyChatState } from '@src/states/atoms';
import useLoaderData from '@src/hooks/useRoaderData';
import { usePostMessageRoom } from '@src/hooks/query/chat';
import { sendHandler } from '@src/apis/chat';
import type { MessageReq, ReplyReq } from '@src/types/apis/chat';
import { ReactComponent as Send } from '@src/assets/icons/ck_arrow_up.svg';
import { ReactComponent as SendGreen } from '@src/assets/icons/ck_arrow_right.svg';
import { ReactComponent as Delete } from '@src/assets/icons/multiply.svg';

const ChatBar = ({ nickname }: { nickname: string }) => {
  const { id: memberId } = useLoaderData<{ id: number }>();
  const { roomInfo } = usePostMessageRoom(memberId);
  const [replyChatItem, setReplyChatItem] = useRecoilState(replyChatState);
  const [chat, setChat] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (replyChatItem) {
        handleSendReply();
        return;
      }
      
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!chat.trim()) return;

    const message: MessageReq = {
      messageRoomId: roomInfo?.messageRoomId,
      type: 'text',
      content: chat,
    };

    try {
      await sendHandler(message, '/pub/direct/send');
      console.log('Message sent successfully');
      setChat('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSendReply = async () => {
    if (!chat.trim()) return;
    if (!replyChatItem?.id) return;

    const message: ReplyReq = {
      parentId: replyChatItem.id,
      messageRoomId: roomInfo?.messageRoomId,
      type: 'text',
      content: chat,
    };

    try {
      await sendHandler(message, '/pub/direct/reply');
      console.log('Reply sent successfully');
      setChat('');
      setReplyChatItem(null);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <Layout>
      {replyChatItem && (
        <ReplyLayout>
          <ReplyContainer>
            <Span>{replyChatItem.nickname}에게 답장</Span>
            <ReplyContent>{replyChatItem.content}</ReplyContent>
          </ReplyContainer>
          <Button type='button' onClick={() => setReplyChatItem(null)}>
            <Delete width={25} height={25} />
          </Button>
        </ReplyLayout>
      )}
      <Container>
        <Input
          type='text'
          value={chat}
          onChange={handleChangeInput}
          placeholder={
            replyChatItem ? '답장 보내기' : `${nickname}에게 문자 보내기`
          }
          onKeyDown={handleKeyDown}
        />
        <Button
          type='button'
          onClick={replyChatItem ? handleSendReply : handleSendMessage}
        >
          {chat ? <SendGreen /> : <Send />}
        </Button>
      </Container>
    </Layout>
  );
};

export default ChatBar;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;

  width: 100%;

  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const ReplyLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${({ theme }) => theme.padding[8]}
    ${({ theme }) => theme.padding[24]};
  background-color: ${({ theme }) => theme.colors.blue100};
`;
const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[2]};
`;
const Span = styled.span`
  color: ${({ theme }) => theme.colors.blue700};
`;
const ReplyContent = styled.p`
  color: ${({ theme }) => theme.colors.neutral950};
`;
const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap[10]};
  padding: ${({ theme }) => theme.padding[16]};
`;
const Input = styled.input`
  padding: 0 0.625rem;
  width: 100%;

  border-radius: 1.875rem;

  ${({ theme }) => theme.fonts.body};
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-itmes: center;
`;
