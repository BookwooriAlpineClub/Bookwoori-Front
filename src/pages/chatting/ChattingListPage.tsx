import styled from 'styled-components';
import ChattingListItem from '@src/components/chatting/ChattingListItem';
import Header from '@src/components/common/Header';

interface Chatting {
  imgUrl: string;
  nickname: string;
  time: string;
  text: string;
  read: boolean;
}

const chatList: Chatting[] = [
  {
    imgUrl:
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSC4DtHTGprsp7K8u0ZlfSDmIDplvQYH5vniT0I3rpcl6wqBh8b',
    nickname: 'AAA',
    time: '오늘 오후 10:00',
    text: '문자 예시',
    read: false,
  },
  {
    imgUrl: '',
    nickname: 'OOO',
    time: '오늘 오후 12:09',
    text: '문자 예시',
    read: true,
  },
  {
    imgUrl: '',
    nickname: 'AAA',
    time: '오늘 오후 10:00',
    text: '문자 예시 문자 예시 문자 예시 문자 예시 문자 예시',
    read: true,
  },
];

const ChattingListPage = () => {
  return (
    <>
      <Header text='문자' headerType='hamburger' />
      <SLayout>
        {chatList.map((it) => (
          <ChattingListItem
            key={it.time}
            nickname={it.nickname}
            imgUrl={it.imgUrl}
            time={it.time}
            text={it.text}
            read={it.read}
          />
        ))}
      </SLayout>
    </>
  );
};

export default ChattingListPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  padding: 0.9375rem;
`;
