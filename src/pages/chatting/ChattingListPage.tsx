import styled from 'styled-components';
import ChattingListItem from '@src/components/chatting/ChattingListItem';
import Header from '@src/components/common/Header';
import useDm from '@src/hooks/query/useDm';

const ChattingListPage = () => {
  const { data } = useDm();
  return (
    <>
      <Header text='문자' headerType='hamburger' />
      <SLayout>
        {data ? (
          data.map((it) => (
            <ChattingListItem
              key={it.messageRoomId}
              nickname={it.nickname}
              imgUrl={it.profileImg}
              time={it.recentMessageTime}
              text={it.recentMessage}
            />
          ))
        ) : (
          <Wrapper>
            <Span>주고 받은 문자가 없습니다.</Span>
          </Wrapper>
        )}
      </SLayout>
    </>
  );
};

export default ChattingListPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  height: calc(100% - 4.375rem);
  padding: 0.9375rem;
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;
`;
const Span = styled.span`
  margin: auto;
  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.black200};
`;
