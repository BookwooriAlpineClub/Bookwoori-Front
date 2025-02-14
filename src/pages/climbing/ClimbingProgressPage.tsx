import styled from 'styled-components';
import ClimbingBoard from '@src/components/climbing/ClimbingBoard';
import Header from '@src/components/common/Header';
import ClimbingDescription from '@src/components/climbing/ClimbingDescription';

const ClimbingProgressPage = ({ name: headerText }: { name: string }) => {
  return (
    <>
      <Header text={headerText} headerType='back' />
      <Main>
        <Wrapper>
          <ClimbingDescription />
        </Wrapper>
        <ClimbingBoard />
      </Main>
    </>
  );
};

export default ClimbingProgressPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  height: 100%;
`;
const Wrapper = styled.div`
  padding: 0 0.625rem;
`;
