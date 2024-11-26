import { useState } from 'react';
import styled from 'styled-components';
import ChatBar from '@src/components/chatting/ChatBar';
import ChatItem from '@src/components/chatting/ChatItem';
import DateLine from '@src/components/chatting/DateLine';
import Header from '@src/components/common/Header';

interface Chatting {
  imgUrl?: string;
  emoji?: string;
  nickname: string;
  time: string;
  text: string;
}

const chatting: Chatting[] = [
  {
    imgUrl: '',
    nickname: 'AAA',
    time: '오늘',
    text: '이야야야',
    emoji: '😢',
  },
  {
    imgUrl: '',
    nickname: '나야나',
    time: '오늘',
    text: '채팅 텍스트 채팅 텍스트 채팅 텍스트 채팅 텍스트',
    emoji: '👍',
  },
  {
    imgUrl: '',
    nickname: 'AAA',
    time: '오늘',
    text: '이야야야',
  },
  {
    imgUrl: '',
    nickname: '나야나',
    time: '오늘',
    text: '채팅 텍스트 채팅 텍스트 채팅 텍스트 채팅 텍스트',
  },
  {
    imgUrl: '',
    nickname: 'AAA',
    time: '오늘',
    text: '이야야야',
  },
  {
    imgUrl: '',
    nickname: '나야나',
    time: '오늘',
    text: '채팅 텍스트 채팅 텍스트 채팅 텍스트 채팅 텍스트',
  },
  {
    imgUrl: '',
    nickname: 'AAA',
    time: '오늘',
    text: '이야야야',
  },
  {
    imgUrl: '',
    nickname: '나야나',
    time: '오늘',
    text: '채팅 텍스트 채팅 텍스트 채팅 텍스트 채팅 텍스트',
  },
  {
    imgUrl: '',
    nickname: 'AAA',
    time: '오늘',
    text: '이야야야',
  },
  {
    imgUrl: '',
    nickname: '나야나',
    time: '오늘',
    text: '채팅 텍스트 채팅 텍스트 채팅 텍스트 채팅 텍스트',
  },
];

const ChattingPage = () => {
  const [nickname] = useState<string>('AAA');
  const [date] = useState<string>('2024년 9월 9일');

  return (
    <>
      <SHeader text={nickname} headerType='back' />
      <SLayout>
        <DateLine date={date} />
        {chatting.map((it) => (
          <ChatItem key={it.time} chatItem={it} />
        ))}
      </SLayout>
      <ChatBar nickname={nickname} />
    </>
  );
};

export default ChattingPage;

const SHeader = styled(Header)`
  z-index: 1;
`;
const SLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;

  min-height: calc(100svh - 8.8125rem);
  width: 100%;
`;
