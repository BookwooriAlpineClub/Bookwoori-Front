import styled from 'styled-components';
import React, { useState } from 'react';
import { sendHandler } from '@src/apis/chat';
import { ReactComponent as Send } from '@src/assets/icons/ck_arrow_up.svg';
import { ReactComponent as SendGreen } from '@src/assets/icons/ck_arrow_right.svg';
import type { MessageReq } from '@src/types/apis/chat';

interface ChannelChatBarProps {
  channelName: string;
  channelId: number;
}

const ChannelChatBar = ({ channelName, channelId }: ChannelChatBarProps) => {
  const [chat, setChat] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chat.trim()) return;

    const message: MessageReq = {
      channelId,
      type: 'text',
      content: chat,
    };

    try {
      await sendHandler(message, '/pub/channel/send');
      console.log('Message sent successfully');
      setChat('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  return (
    <SLayout onSubmit={handleSendMessage}>
      <SInput
        type='text'
        value={chat}
        onChange={handleChangeInput}
        placeholder={`${channelName}에 문자 보내기`}
      />
      <SButton type='submit'>{chat ? <SendGreen /> : <Send />}</SButton>
    </SLayout>
  );
};

export default ChannelChatBar;

const SLayout = styled.form`
  display: flex;
  gap: 0.625rem;
  position: sticky;
  bottom: 0;

  width: 100%;
  padding: 0.9375rem;

  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const SInput = styled.input`
  padding: 0 0.625rem;
  width: 100%;

  border-radius: 1.875rem;

  ${({ theme }) => theme.fonts.body};
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-itmes: center;
`;
