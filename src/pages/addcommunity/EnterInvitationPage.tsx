import Header from '@src/components/common/Header';
import styled from 'styled-components';
import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';
import InputField from '@src/components/common/InputField';
import Button from '@src/components/common/Button';
import React, { useEffect, useState } from 'react';
import IntroSection from '@src/components/addcommunity/IntroSection';

const headerText = '공동체 초대장 입력하기';
const headerType = 'back';
const introTitleText = '공동체에 초대 받으셨군요!';
const introBodyLines = [
  { id: 'line1', text: '아래에 초대장을 입력하여 공동체에 참여하세요.' },
  { id: 'line2', text: "초대장은 다음 형태여야 해요. 'bookWOORI'" },
];

const EnterInvitationPage = () => {
  const [invitationCode, setInvitationCode] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleInvitationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInvitationCode(e.target.value);
  };

  const handleFindCommunity = () => {
    alert('찾는 중...');
  };

  useEffect(() => {
    setIsFormValid(invitationCode.trim().length > 0);
  }, [invitationCode]);

  return (
    <>
      <Header text={headerText} headerType={headerType} />
      <Container>
        <IntroSection title={introTitleText} bodyLines={introBodyLines} />
        <TitleAndFieldContainer title='초대 코드'>
          <InputField
            type='text'
            value={invitationCode}
            placeholder='초대장을 입력하세요.'
            onChange={handleInvitationCodeChange}
          />
        </TitleAndFieldContainer>
        <ButtonWrapper>
          <Button
            type='submit'
            disabled={!isFormValid}
            onClick={handleFindCommunity}
          >
            공동체 찾기
          </Button>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default EnterInvitationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.98rem;
  padding: 1.87rem 1.25rem;
  width: 100vw;
  width: 100svw;
  min-height: calc(100vh - 4.375rem);
  min-height: calc(100svh - 4.375rem);
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
