import Header from '@src/components/common/Header';
import styled from 'styled-components';
import Button from '@src/components/common/Button';
import IntroSection from '@src/components/addcommunity/IntroSection';
import React from 'react';
import CommunityInfoCard from '@src/components/common/CommunityInfoCard';

const headerText = '공동체 정보 확인하기';
const headerType = 'back';
const introTitleText = '공동체 정보를 확인해주세요.';
const introBodyLines = [
  { id: 'line1', text: '다음 공동체에 초대 받은 게 맞는지' },
  { id: 'line2', text: '공동체 정보를 확인한 뒤에 참여해주세요.' },
];

const CheckInvitedCommunityPage = () => {
  const name = '피크민을 하자';
  const memberInfo = '멤버 3명';
  const creationDate = '2021.08.01';
  const description = '피크민을 하면서 즐거운 시간을 보내요!';
  // const longDescription =
  //   '피크민을 하면서 즐거운 시간을 보내요! 피크민을 하면서 즐거운 시간을 보내요! 피크민을 하면서 즐거운 시간을 보내요!';
  const imageUrl = '';
  return (
    <>
      <Header text={headerText} headerType={headerType} />
      <Container>
        <IntroSection title={introTitleText} bodyLines={introBodyLines} />
        <CommunityInfoCard
          name={name}
          memberInfo={memberInfo}
          creationDate={creationDate}
          description={description}
          imageUrl={imageUrl}
        />
        <ButtonWrapper>
          <Button type='submit'>참여하기</Button>
        </ButtonWrapper>
        <BottomSpacer />
      </Container>
    </>
  );
};

export default CheckInvitedCommunityPage;

const Container = styled.div`
  width: 100vw;
  width: 100svw;
  min-height: calc(100vh - 4.375rem);
  min-height: calc(100svh - 4.375rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.98rem;
  padding: 0 1.25rem;
  padding-top: 1.875rem;
  background-color: ${({ theme }) => theme.colors.black300};
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: calc(1.875rem + 2px);
  left: 50%;
  transform: translateX(-50%);
`;

const BottomSpacer = styled.div`
  height: calc(1.875rem + 2px + 2.56rem + 2.56rem);
  width: 100%;
`;
