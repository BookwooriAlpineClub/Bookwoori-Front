import Header from '@src/components/common/Header';
import styled from 'styled-components';
import Button from '@src/components/common/Button';
import IntroSection from '@src/components/addcommunity/IntroSection';
import React from 'react';
import CommunityInfoCard from '@src/components/common/CommunityInfoCard';
import { useParams } from 'react-router-dom';
import Spinner from '@src/components/common/Spinner';
import {
  useGetServerByCode,
  usePostServerJoin,
} from '@src/hooks/query/useServerTmp';

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
      <Container>
        <IntroSection title={introTitleText} bodyLines={introBodyLines} />
        <CommunityInfoCard
          name={server.name}
          memberInfo={memberInfo}
          creationDate={server.createdAt}
          description={server.description}
          imageUrl={server.serverImg || ' '}
        />
        <ButtonWrapper>
          <Button type='submit' onClick={() => joinServer()}>
            참여하기
          </Button>
        </ButtonWrapper>
        <BottomSpacer />
      </Container>
    </>
  );
};

export default CheckInvitedCommunityPage;

const Container = styled.div`
  min-height: calc(100% - 4.375rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1.25rem;
  padding-top: 1.875rem;
  background-color: ${({ theme }) => theme.colors.neutral50};
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: calc(1.875rem + 2px);
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 1.25rem;
`;

const BottomSpacer = styled.div`
  height: calc(1.875rem + 2px + 2.56rem + 2.56rem);
  width: 100%;
`;
