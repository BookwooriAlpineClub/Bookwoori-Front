import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import Spinner from '@src/components/common/Spinner';

const RedirectionPage = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  if (accessToken && refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    window.location.replace(ROUTE_PATH.root);
  } else {
    window.location.replace(ROUTE_PATH.signIn);
  }

  return (
    <Layout>
      <Spinner />
    </Layout>
  );
};

export default RedirectionPage;

const Layout = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
