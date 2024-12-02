import Header from '@src/components/common/Header';
import styled from 'styled-components';
import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';
import InputField from '@src/components/common/InputField';
import Button from '@src/components/common/Button';
import React, { useEffect, useState } from 'react';
import IntroSection from '@src/components/addcommunity/IntroSection';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';

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

  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleInvitationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInvitationCode(e.target.value);
  };

  const handleFindCommunity = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(
        ROUTE_PATH.invitationServer.replace(':invitationCode', invitationCode),
      );
    }, 300);
  };

  // 유효성 검사 추가
  useEffect(() => {
    const isValidCode = /^[a-z0-9]{10,12}$/.test(invitationCode.trim());
    setIsFormValid(isValidCode);
  }, [invitationCode]);

  return (
    <div
      style={{
        transform: isTransitioning ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 300ms ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
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
          {!isFormValid && invitationCode.trim() !== '' && (
            <span style={{ color: '#fa6554', fontSize: '0.7rem' }}>
              초대 코드는 숫자와 영어 소문자를 혼합한 10-12자리입니다.
            </span>
          )}
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
    </div>
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
