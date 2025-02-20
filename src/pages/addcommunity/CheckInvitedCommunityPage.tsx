import Header from '@src/components/common/Header';
import styled from 'styled-components';
import Button from '@src/components/common/button/Button';
import IntroSection from '@src/components/addcommunity/IntroSection';
import CommunityInfoCard from '@src/components/community/CommunityInfoCard';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '@src/components/common/Spinner';
import { useGetServerByCode, usePostServerJoin } from '@src/hooks/query/server';
import { ROUTE_PATH } from '@src/constants/routePath';
import { encodeId } from '@src/utils/formatters';
import useToast from '@src/hooks/useToast';

const headerText = '공동체 정보 확인하기';
const headerType = 'back';
const introTitleText = '공동체 정보를 확인해주세요.';
const introBodyLines = [
  { text: '다음 공동체에 초대 받은 게 맞는지' },
  { text: '공동체 정보를 확인한 뒤에 참여해주세요.' },
];

const CheckInvitedCommunityPage = () => {
  const navigate = useNavigate();

  const { invitationCode } = useParams<{ invitationCode: string }>();
  if (!invitationCode) {
    navigate(ROUTE_PATH.invitationCode);
    return null;
  }

  const addToast = useToast();
  const { data: server, isLoading } = useGetServerByCode(invitationCode);
  const { mutate: joinServerMutate } = usePostServerJoin();

  if (isLoading) {
    return <Spinner />;
  }
  if (!server) {
    navigate(ROUTE_PATH.invitationCode);
    return null;
  }

  const handleJoinServer = () => {
    joinServerMutate(invitationCode, {
      onSuccess: (res) => {
        addToast('success', '가입 완료');
        const { serverId } = res;
        const path = ROUTE_PATH.server.replace(':serverId', encodeId(serverId));
        navigate(path);
      },
    });
  };

  const memberInfo = `방장 ${server.ownerNickname} ・ 멤버 ${server.memberCount}명`;

  return (
    <>
      <Header text={headerText} headerType={headerType} />
      <Main>
        <div className='scroll-area'>
          <IntroSection title={introTitleText} bodyLines={introBodyLines} />
          <CommunityInfoCard
            name={server.name}
            memberInfo={memberInfo}
            creationDate={server.createdAt}
            description={server.description}
            imageUrl={server.serverImg}
          />
        </div>
        <Button type='submit' onClick={() => handleJoinServer()}>
          참여하기
        </Button>
      </Main>
    </>
  );
};

export default CheckInvitedCommunityPage;

const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.neutral50};

  .scroll-area {
    gap: ${({ theme }) => theme.gap['16']};
  }
`;
