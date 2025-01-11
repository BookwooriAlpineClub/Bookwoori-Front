import styled from 'styled-components';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDm } from '@src/hooks/query/useDm';
import ChattingListItem from '@src/components/chatting/ChattingListItem';
import Header from '@src/components/common/Header';
import LoadingPage from '@src/components/common/LoadingPage';

const ChattingListPage = () => {
  const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    useDm();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isLoading, hasNextPage, fetchNextPage]);

  if (isLoading) {
    <LoadingPage />;
  }

  return (
    <>
      <Header text='문자' headerType='hamburger' />
      <SLayout>
        {data?.pages?.map((page) =>
          page.messageRooms.map((it) => (
            <ChattingListItem
              key={it.messageRoomId}
              memberId={it.memberId}
              nickname={it.nickname}
              imgUrl={it.profileImg}
              time={it.recentMessageTime}
              text={it.recentMessage}
            />
          )),
        )}
        {!isLoading && data?.pages?.length === 0 && (
          <Wrapper>
            <Span>주고 받은 문자가 없습니다.</Span>
          </Wrapper>
        )}
        <div ref={ref} style={{ height: 50 }} />
        {isFetchingNextPage && (
          <Wrapper>
            <Span>데이터 불러오는 중...</Span>
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
  color: ${({ theme }) => theme.colors.neutral400};
`;
