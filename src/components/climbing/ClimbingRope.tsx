import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import type { ClimbingMember } from '@src/types/climbing';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetClimbing } from '@src/hooks/query/climbing';
import { handleImgError } from '@src/utils/helpers';
import { ReactComponent as Flag } from '@src/assets/icons/climbing_flag_color.svg';
import { ReactComponent as FlagBefore } from '@src/assets/icons/climbing_flag_outline.svg';
import ProfileImg from '@src/assets/images/userSettings/background_default.svg';
import Memo from '@src/components/climbing/Memo';
import ProgressBar from '@src/components/climbing/ProgressBar';
import {
  ClimbingReadingStatus,
  ClimbingStatus,
} from '@src/constants/constants';

interface Props {
  item: ClimbingMember;
}

const ClimbingRope = ({ item }: Props) => {
  const { id } = useLoaderData<{ id: number }>();
  const { climbingInfo } = useGetClimbing(id);

  const [height, setHeight] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
    observer.disconnect();
  }, []);

  return (
    <Layout>
      <Background>
        {item.status === ClimbingReadingStatus.FINISHED ? (
          <Flag width={85} height={100} />
        ) : (
          <FlagBefore width={85} height={100} />
        )}
      </Background>
      <Container ref={containerRef}>
        <Line />
        <ProgressBar
          height={height}
          page={item.currentPage}
          isChanged={containerHeight}
        />
        <Profile>
          <Img
            alt='memberImg'
            src={item.profileImg ?? ProfileImg}
            outline={
              climbingInfo?.status === ClimbingStatus.FINISHED &&
              item.status === ClimbingReadingStatus.FINISHED
            }
            onError={(e) => handleImgError(e, ProfileImg)}
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
  gap: ${({ theme }) => theme.gap[12]};

  height: 100%;
  width: 100%;
`;
const Background = styled.div`
  display: flex;
  justify-content: center;

  height: 5.5rem;
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding-bottom: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const Line = styled.div`
  margin-bottom: 0.0625rem;

  width: 100%;
  height: 0.0625rem;
  background-color: ${({ theme }) => theme.colors.neutral200};
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.gap[6]};
`;
const Img = styled.img<{ outline?: boolean }>`
  width: 3.25rem;
  height: 3.25rem;

  border: ${({ outline, theme }) =>
    outline && `0.1875rem solid ${theme.colors.blue500}`};
  border-radius: 50%;

  object-fit: cover;
`;
const Nickname = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral950};
`;
