import styled from 'styled-components';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ROUTE_PATH } from '@src/constants/routePath';
import { useDm } from '@src/hooks/query/useDm';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import { formatChatListItemTime } from '@src/utils/formatters';
import StatusBadgeListItem from '@src/components/common/StatusBadgeListItem';
import Header from '@src/components/common/Header';

const ChattingListPage = () => {
  const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    useDm();
  const { ref, inView } = useInView();
  const navigate = useEncodedNavigation();

  useEffect(() => {
    if (inView && !isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isLoading, hasNextPage, fetchNextPage]);

  return (
    <>
      <Header text='문자' headerType='hamburger' />
      <Layout>
        {data?.pages?.map((page) =>
          page.messageRooms.map((it) => (
            <StatusBadgeListItem
              key={it.messageRoomId}
              type='chatting'
              caption={it.nickname}
              imgUrl={it.profileImg}
              time={
                it.recentMessageTime
                  ? formatChatListItemTime(it.recentMessageTime)
                  : '알 수 없음'
              }
              message={it.recentMessage}
              isRead={false}
              onClick={() => navigate(ROUTE_PATH.dmChat, it.memberId)}
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
      </Layout>
    </>
  );
};

export default ChattingListPage;

const Layout = styled.div`
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
