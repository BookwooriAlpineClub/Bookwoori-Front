import styled from 'styled-components';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ROUTE_PATH } from '@src/constants/routePath';
import { useGetMessageRoomList } from '@src/hooks/query/chat';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import { formatChatListItemTime } from '@src/utils/formatters';
import StatusBadgeListItem from '@src/components/common/StatusBadgeListItem';
import Header from '@src/components/common/Header';

const ChattingListPage = () => {
  const navigate = useEncodedNavigation();
  const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    useGetMessageRoomList();
  const { ref, inView } = useInView();

  const handleNavigateChattingRoom = (memberId: number) => {
    navigate(ROUTE_PATH.dmChat, memberId);
  };

  useEffect(() => {
    if (!inView) return;

    if (hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  return (
    <>
      <Header text='문자' headerType='hamburger' />
      <Main>
        {data?.map((page) =>
          page.messageRooms
            .filter((it) => it.recentMessage)
            .map((it) => (
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
                isRead
                onClick={() => handleNavigateChattingRoom(it.memberId)}
              />
            )),
        )}
        {!isLoading && data?.length === 0 && (
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
      </Main>
    </>
  );
};

export default ChattingListPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[10]};

  height: calc(100% - 4.375rem);
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;
`;
const Span = styled.span`
  margin: auto;

  color: ${({ theme }) => theme.colors.neutral400};
`;
