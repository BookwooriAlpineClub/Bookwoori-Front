import styled from 'styled-components';
import { ReactComponent as KakaoButton } from '@src/assets/images/login/kakao_login.svg';
import { ReactComponent as Logo } from '@src/assets/images/login/bookwoori_logo.svg';
import { kakaoUrl } from '@src/constants/env';

const LoginPage = () => {
  return (
    <Main>
      <SLogo />
      <Button href={kakaoUrl}>
        <KakaoButton />
      </Button>
    </Main>
  );
};

export default LoginPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.75rem;

  height: 100%;
  background-color: ${({ theme }) => theme.colors.lime300};
`;
const SLogo = styled(Logo)`
  width: 18.75rem;
  height: 4.0625rem;
`;
const Button = styled.a`
  display: flex;
  align-items: center;

  border-radius: 0.625rem;
  border: 0.125rem solid ${({ theme }) => theme.colors.neutral950};
`;
