import styled from 'styled-components';
import Spinner from '@src/components/common/Spinner';

const LoadingPage = () => {
  return (
    <Main>
      <Spinner />
    </Main>
  );
};

export default LoadingPage;

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;
