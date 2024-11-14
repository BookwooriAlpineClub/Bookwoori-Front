import styled from 'styled-components';
import { ReactComponent as KakaoButton } from '@src/assets/images/login/kakao_login.svg';
import { ReactComponent as Logo } from '@src/assets/images/login/bookwoori_logo.svg';

const LoginPage = () => {
  return (
    <Layout>
      <SLogo />
      <Button>
        <KakaoButton />
      </Button>
    </Layout>
  );
};

export default LoginPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.75rem;

  height: 100%;
  background-color: ${({ theme }) => theme.colors.neonGreen};
`;
const SLogo = styled(Logo)`
  width: 18.75rem;
  height: 4.0625rem;
`;
const Button = styled.button`
  display: flex;
  align-items: center;

  border-radius: 10px;
  border: 0.125rem solid ${({ theme }) => theme.colors.black100};
`;
