import styled from 'styled-components';
import ClimbingBoard from '@src/components/climbing/ClimbingBoard';
import Header from '@src/components/common/Header';
import ClimbingDescription from '@src/components/climbing/ClimbingDescription';

const ClimbingProgressPage = ({ name: headerText }: { name: string }) => {
  return (
    <>
      <Header text={headerText} headerType='back' />
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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  height: 100%;
  padding: 0.9375rem 0 0;
`;
const Wrapper = styled.div`
  padding: 0 0.625rem;
`;
