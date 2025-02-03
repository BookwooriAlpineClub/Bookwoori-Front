import Header from '@src/components/common/Header';
import styled from 'styled-components';
import Button from '@src/components/common/button/Button';
import IntroSection from '@src/components/addcommunity/IntroSection';
import CommunityInfoCard from '@src/components/community/CommunityInfoCard';
import { useParams } from 'react-router-dom';
import Spinner from '@src/components/common/Spinner';
import { useGetServerByCode, usePostServerJoin } from '@src/hooks/query/server';

const headerText = '공동체 정보 확인하기';
const headerType = 'back';
const introTitleText = '공동체 정보를 확인해주세요.';
const introBodyLines = [
  { text: '다음 공동체에 초대 받은 게 맞는지' },
  { text: '공동체 정보를 확인한 뒤에 참여해주세요.' },
];

const CheckInvitedCommunityPage = () => {
  const { invitationCode } = useParams<{ invitationCode: string }>();

  if (!invitationCode) {
    return <div>Fallback ui...</div>;
  }
  const {
    data: server,
    isLoading,
    isError,
  } = useGetServerByCode(invitationCode);
  const { mutate: joinServer } = usePostServerJoin(invitationCode);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError || !server) {
    return <div>Error...</div>;
  }

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
            imageUrl={server.serverImg || ' '}
          />
        </div>
        <Button type='submit' onClick={() => joinServer()}>
          참여하기
        </Button>
      </Main>
    </>
  );
};

export default CheckInvitedCommunityPage;

const Main = styled.main`
  min-height: calc(100% - 4.375rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1.25rem;
  padding-top: 1.875rem;
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
