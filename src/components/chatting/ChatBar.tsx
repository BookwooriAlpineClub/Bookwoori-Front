import styled from 'styled-components';
import React, { useState } from 'react';
import { ReactComponent as Send } from '@src/assets/icons/send.svg';
import { ReactComponent as SendGreen } from '@src/assets/icons/send_green.svg';
import { sendHandler } from '@src/apis/chat';
import useLoaderData from '@src/hooks/useRoaderData';
import { useRoomInfo } from '@src/hooks/query/useDm';

const ChatBar = ({ nickname }: { nickname: string }) => {
  const { id: memberId } = useLoaderData<{ id: number }>();
  const { roomInfo } = useRoomInfo(memberId);
  const [chat, setChat] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!chat.trim()) return;

    const message: MessageRequest = {
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

  return (
    <SLayout>
      <SInput
        type='text'
        value={chat}
        onChange={handleChangeInput}
        placeholder={`${nickname}에게 문자 보내기`}
        onKeyDown={handleKeyDown}
      />
      <SButton type='button' onClick={handleSendMessage}>
        {chat ? <SendGreen /> : <Send />}
      </SButton>
    </SLayout>
  );
};

export default ChatBar;

const SLayout = styled.div`
  display: flex;
  gap: 0.625rem;
  position: sticky;
  bottom: 0;

  width: 100%;
  padding: 0.9375rem;

  background-color: ${({ theme }) => theme.colors.white};
`;
const SInput = styled.input`
  padding: 0 0.625rem;
  width: 100%;

  border-radius: 1.875rem;

  ${({ theme }) => theme.fonts.body};
  background-color: ${({ theme }) => theme.colors.black300};
`;
const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-itmes: center;
`;
