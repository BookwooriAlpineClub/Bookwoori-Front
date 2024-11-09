import styled from 'styled-components';
import React, { useState } from 'react';
import { ReactComponent as Send } from '@src/assets/icons/send.svg';
import { ReactComponent as SendGreen } from '@src/assets/icons/send_green.svg';

const ChatBar = ({ nickname }: { nickname: string }) => {
  const [chat, setChat] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  };

  return (
    <SLayout>
      <SInput
        type='text'
        value={chat}
        onChange={handleChangeInput}
        placeholder={`${nickname}에게 문자 보내기`}
      />
      <SButton type='button'>{chat ? <SendGreen /> : <Send />}</SButton>
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
