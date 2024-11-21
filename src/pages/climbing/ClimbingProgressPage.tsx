import styled from 'styled-components';
import { useState } from 'react';
import ClimbingBoard from '@src/components/climbing/ClimbingBoard';
import Header from '@src/components/common/Header';

const ClimbingProgressPage = () => {
  const [headerText] = useState<string>('클라이밍 제목');

  return (
    <>
      <Header text={headerText} headerType='back' />
      <Layout>
        <ClimbingBoard />
      </Layout>
    </>
  );
};

export default ClimbingProgressPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5625rem;
`;
