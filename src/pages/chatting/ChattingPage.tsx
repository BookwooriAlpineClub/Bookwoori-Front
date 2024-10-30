import ChatBar from '@src/components/chatting/ChatBar';
import ChatItem from '@src/components/chatting/ChatItem';
import DateLine from '@src/components/chatting/DateLine';
import Header from '@src/components/common/Header';
import { useState } from 'react';
import styled from 'styled-components';

const ChattingPage = () => {
  const [nickname] = useState<string>('AAA');
  const [date] = useState<string>('2024년 9월 9일');

  return (
    <>
      <Header text={nickname} headerType='back' />
      <SLayout>
        <DateLine date={date} />
        <ChatItem
          nickname={nickname}
          time='오늘'
          text='텍스트어어어어어ㅓ어어어어어어ㅓㅇ어ㅓ 어어어어어어'
        />
        <ChatItem
          nickname='내별명'
          time='오늘'
          text='텍스트어어어어어ㅓ어어어어어어ㅓㅇ어ㅓ 어어어어어어'
        />
      </SLayout>
      <ChatBar nickname={nickname} />
    </>
  );
};

export default ChattingPage;

const SLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;

  min-height: calc(100% - 9.375rem);
  width: 100%;
`;
