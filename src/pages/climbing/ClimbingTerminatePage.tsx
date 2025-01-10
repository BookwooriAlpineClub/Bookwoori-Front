import ClimbingBoard from '@src/components/climbing/ClimbingBoard';
import Header from '@src/components/common/Header';
import SegmentedButton from '@src/components/climbing/SegmentedButton';
import { useState } from 'react';
import styled from 'styled-components';
import ReviewBoard from '@src/components/climbing/ReviewBoard';

export type ViewType = 'climbing' | 'review';

const ClimbingTerminatePage = ({ name: headerText }: { name: string }) => {
  const [selectedView, setSelectedView] = useState<ViewType>('climbing');
  const handleSegmentChange = (value: ViewType) => {
    setSelectedView(value);
  };

  return (
    <>
      <HeaderWithZIndex text={headerText} headerType='back' />
      <Container>
        <SegmentedButton onSegmentChange={handleSegmentChange} />
        {selectedView === 'climbing' && <ClimbingBoard />}
        {selectedView === 'review' && <ReviewBoard />}
      </Container>
    </>
  );
};

export default ClimbingTerminatePage;

const HeaderWithZIndex = styled(Header)`
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.875rem;
  gap: 1.25rem;
  background-color: ${({ theme }) => theme.colors.neutral50};
  min-height: calc(100% - 4.375rem);
  position: relative;
  height: calc(100% - 4.375rem);
`;
