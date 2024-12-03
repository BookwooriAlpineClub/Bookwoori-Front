import styled from 'styled-components';
import Spinner from '@src/components/common/Spinner';

const LoadingPage = () => {
  return (
    <Layout>
      <Spinner />
    </Layout>
  );
};

export default LoadingPage;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;
