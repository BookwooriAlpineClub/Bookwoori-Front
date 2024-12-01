import Header from '@src/components/common/Header';
import styled from 'styled-components';
import Button from '@src/components/common/Button';
import IntroSection from '@src/components/addcommunity/IntroSection';
import React from 'react';
import CommunityInfoCard from '@src/components/common/CommunityInfoCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getServerByCode, postServerJoinByCode } from '@src/apis/server';
import Spinner from '@src/components/common/Spinner';
import { ROUTE_PATH } from '@src/constants/routePath';

const headerText = '공동체 정보 확인하기';
const headerType = 'back';
const introTitleText = '공동체 정보를 확인해주세요.';
const introBodyLines = [
  { id: 'line1', text: '다음 공동체에 초대 받은 게 맞는지' },
  { id: 'line2', text: '공동체 정보를 확인한 뒤에 참여해주세요.' },
];

const CheckInvitedCommunityPage = () => {
  // const name = '피크민을 하자';
  // const creationDate = '2021.08.01';
  // const description = '피크민을 하면서 즐거운 시간을 보내요!';
  // const imageUrl = '';

  const { invitationCode } = useParams<{ invitationCode: string }>();
  const navigate = useNavigate();

  const {
    data: server,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['serverByCode', invitationCode],
    queryFn: () => getServerByCode(invitationCode as string),
    enabled: !!invitationCode,
  });

  const joinServer = useMutation({
    mutationFn: () => postServerJoinByCode(invitationCode as string),
    onSuccess: () => {
      console.log('join server success');
      alert('가입 완료!');
      const path = ROUTE_PATH.server.replace(
        ':serverId',
        server?.serverId.toString() || '',
      );
      navigate(path);
    },
    onError: () => {
      console.error('join server error');
      alert('가입 실패');
    },
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (error || !server) {
    return <div>유효하지 않은 초대 코드입니다.</div>;
  }

  const memberInfo = `방장 ${server.ownerNickname} ・ 멤버 ${server.memberCount}명`;

  const handleJoinServer = () => {
    joinServer.mutate();
  };
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
          <Button type='submit' onClick={handleJoinServer}>
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
  background-color: ${({ theme }) => theme.colors.black300};
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
