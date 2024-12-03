import styled from 'styled-components';
import ClimbingBoard from '@src/components/climbing/ClimbingBoard';
import Header from '@src/components/common/Header';
import ClimbingDescription from '@src/components/climbing/ClimbingDescription';
// import { useLocation } from 'react-router-dom';

const ClimbingProgressPage = ({ name: headerText }: { name: string }) => {
  // const location = useLocation();
  // const { children: climbingTitle } = location.state;

  return (
    <>
      <SHeader text={headerText} headerType='back' />
      <Layout>
        <Wrapper>
          <ClimbingDescription />
        </Wrapper>
        <ClimbingBoard />
      </Layout>
    </>
  );
};

export default ClimbingProgressPage;

const SHeader = styled(Header)`
  z-index: 1;
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  height: calc(100% - 4.375rem);
  padding: 0.9375rem 0 0;
`;
const Wrapper = styled.div`
  padding: 0 0.625rem;
`;
