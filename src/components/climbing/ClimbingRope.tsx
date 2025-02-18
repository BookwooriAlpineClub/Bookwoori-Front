import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import type { ClimbingMember } from '@src/types/climbing';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetClimbing } from '@src/hooks/query/climbing';
import { dialogState } from '@src/states/atoms';
import {
  ClimbingReadingStatus,
  ClimbingStatus,
} from '@src/constants/constants';
import { ReactComponent as Flag } from '@src/assets/icons/flag.svg';
import Memo from '@src/components/climbing/Memo';
import ProgressBar from '@src/components/climbing/ProgressBar';
import UserAvatar from '@src/components/common/UserAvatar';
import useModal from '@src/hooks/useModal';
import ProfileModal from '@src/components/community/ProfileModal';

interface Props {
  item: ClimbingMember;
}

const ClimbingRope = ({ item }: Props) => {
  const { id } = useLoaderData<{ id: number }>();
  const { climbingInfo } = useGetClimbing(id);

  const [height, setHeight] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal: openDialog } = useModal(dialogState);

  const openProfileModal = (memberId: number) => {
    const ProfileModalComponent = <ProfileModal memberId={memberId} />;
    openDialog(ProfileModalComponent);
  };

  useEffect(() => {
    if (!climbingInfo) return;

    const newHeight =
      item.currentPage / (climbingInfo.bookInfo.itemPage as number);

    setHeight(newHeight);
  }, [item, climbingInfo]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      if (container) {
        const newHeight = container.offsetHeight;
        setContainerHeight(newHeight);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <Background>
        <Wrapper $color={item.status === ClimbingReadingStatus.FINISHED}>
          <Flag width={50} height={60} />
        </Wrapper>
      </Background>
      <Container ref={containerRef}>
        <Line />
        <ProgressBar
          height={height}
          page={item.currentPage}
          isChanged={containerHeight}
          status={item.status}
        />
        <Profile onClick={() => openProfileModal(item.memberId)}>
          <UserAvatar
            profileImg={item.profileImg ?? ''}
            nickname={item.nickname}
            status={
              item.status === ClimbingReadingStatus.FINISHED
                ? 'FINISHED'
                : 'FAILED'
            }
          />
          <Nickname>{item.nickname}</Nickname>
        </Profile>
        {!(
          climbingInfo?.status === ClimbingStatus.FINISHED ||
          climbingInfo?.status === ClimbingStatus.FAILED
        ) && <Memo isUser={item.isMine} memo={item.memo ? item.memo : ''} />}
      </Container>
    </Layout>
  );
};

export default ClimbingRope;

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
`;
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;

  height: 5.5rem;
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
const Wrapper = styled.div<{ $color: boolean }>`
  height: 3.75rem;
  margin-left: 1.5625rem;

  color: ${({ $color, theme }) =>
    $color ? `${theme.colors.blue500}` : `${theme.colors.neutral200}`};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding-bottom: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
const Line = styled.div`
  margin-bottom: 0.0625rem;

  width: 100%;
  height: 0.0625rem;
  background-color: ${({ theme }) => theme.colors.neutral200};
`;
const Profile = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.gap[6]};

  ${({ theme }) => theme.fonts.body};
`;
const Nickname = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral950};
`;
