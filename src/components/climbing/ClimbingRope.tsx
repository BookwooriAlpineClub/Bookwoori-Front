import styled from 'styled-components';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ReactComponent as Flag } from '@src/assets/icons/climbing_flag_done.svg';
import { ReactComponent as FlagBefore } from '@src/assets/icons/climbing_flag_before.svg';
import ProfileImg from '@src/assets/images/userSettings/profile_default.svg';
import Memo from '@src/components/climbing/Memo';
import ProgressBar from '@src/components/climbing/ProgressBar';
import { ClimbingParticipants } from '@src/types/domain/climbingTemp';

interface Props {
  item: ClimbingParticipants;
}

const ClimbingRope = ({ item }: Props) => {
  // 해당 아이템이 내거인지 비교
  const [isUser] = useState<boolean>(true);
  // 전역으로 클라이밍 정보를 저장하고 해당 정보를 가져올 예정
  const totalPage: number = 500;
  // 전역으로 클라이밍 상태 가져옴
  const status: string = 'PROGRESS';
  const [height, setHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const calculatePercentage = (): number => {
    return item.currentPage / totalPage;
  };

  useEffect(() => {
    setHeight(calculatePercentage());
  }, [item, totalPage]);

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
    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();
  }, []);

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = ProfileImg;
  };

  return (
    <Layout>
      <Background>
        {item.status === 'FINISHED' ? <SFlag /> : <SFlagBefore />}
      </Background>
      <Container ref={containerRef}>
        <Line />
        <ProgressBar
          height={height}
          page={item.currentPage}
          isChanged={containerHeight}
        />
        <Profile>
          {item.profileImg ? (
            <Img
              src={item.profileImg}
              outline={status === 'FINISHED' && item.status === 'FINISHED'}
              onError={handleImgError}
            />
          ) : (
            <Img src={ProfileImg} alt='img' />
          )}
          <Nickname>{item.nickname}</Nickname>
        </Profile>
        {(isUser || item.memo) && status !== 'FINISHED' && (
          <Memo isUser={isUser} memo={item.memo ? item.memo : ''} />
        )}
      </Container>
    </Layout>
  );
};

export default ClimbingRope;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8125rem;

  height: 100%;
  width: 100%;
`;
const Background = styled.div`
  display: flex;
  justify-content: center;

  height: 5.5rem;
  background-color: ${({ theme }) => theme.colors.black300};
`;
const SFlag = styled(Flag)`
  width: 5.3125rem;
  height: 6.25rem;
`;
const SFlagBefore = styled(FlagBefore)`
  width: 5.3125rem;
  height: 6.25rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding-bottom: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const Line = styled.div`
  margin-bottom: 0.0625rem;

  width: 100%;
  height: 0.0625rem;
  background-color: ${({ theme }) => theme.colors.black400};
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4375rem;
`;
const Img = styled.img<{ outline?: boolean }>`
  width: 3.25rem;
  height: 3.25rem;

  border: ${({ outline, theme }) =>
    outline && `0.1875rem solid ${theme.colors.blue100}`};
  border-radius: 50%;

  object-fit: cover;
`;
const Nickname = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.colors.black100};
`;
