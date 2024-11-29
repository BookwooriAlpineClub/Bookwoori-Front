import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ReactComponent as Flag } from '@src/assets/icons/climbing_flag_done.svg';
import { ReactComponent as FlagBefore } from '@src/assets/icons/climbing_flag_before.svg';
import Memo from '@src/components/climbing/Memo';
import ProgressBar from './ProgressBar';

interface ClimbingMemberInfo {
  memberId: number;
  nickname: string;
  profileImg: string;
  memo: string | null;
  currentPage: number;
}

interface Props {
  item: ClimbingMemberInfo;
}

const PROGRESS_BAR_HEIGHT = 350;

const ClimbingRope = ({ item }: Props) => {
  // 해당 아이템이 내거인지 비교
  const [isUser] = useState<boolean>(true);
  // 전역으로 클라이밍 정보를 저장하고 해당 정보를 가져올 예정
  const totalPage: number = 500;
  // 전역으로 클라이밍 상태 가져옴
  const status: string = 'PROGRESS';
  const [height, setHeight] = useState<number>(0);

  const calculatePercentage = (): number => {
    return PROGRESS_BAR_HEIGHT * (item.currentPage / totalPage);
  };

  useEffect(() => {
    setHeight(calculatePercentage());
  }, [item, totalPage]);

  return (
    <Layout>
      <Container>
        {height === PROGRESS_BAR_HEIGHT ? <SFlag /> : <SFlagBefore />}
        <Line />
        <ProgressBar height={height} page={item.currentPage} />
        <Profile>
          <Img
            src={item.profileImg}
            outline={status === 'FINISHED' && height === PROGRESS_BAR_HEIGHT}
          />
          <Nickname>{item.nickname}</Nickname>
        </Profile>
      </Container>
      {(isUser || item.memo) && status !== 'FINISHED' && (
        <Memo isUser={isUser} memo={item.memo ? item.memo : ''} />
      )}
    </Layout>
  );
};

export default ClimbingRope;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8125rem;
  height: 100%;
`;
const SFlag = styled(Flag)`
  width: 5.3125rem;
  height: 6.25rem;
`;
const SFlagBefore = styled(FlagBefore)`
  width: 5.3125rem;
  height: 6.25rem;
`;
const Line = styled.div`
  margin-bottom: 0.0625rem;

  width: 100%;
  height: 0.0625rem;
  background-color: ${({ theme }) => theme.colors.black400};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4375rem;
`;
const Img = styled.img<{ outline: boolean }>`
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
