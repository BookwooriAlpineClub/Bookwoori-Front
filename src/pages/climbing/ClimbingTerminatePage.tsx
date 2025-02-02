import ClimbingBoard from '@src/components/climbing/ClimbingBoard';
import Header from '@src/components/common/Header';
import { useState } from 'react';
import styled from 'styled-components';
import ReviewBoard from '@src/components/climbing/ReviewBoard';
import SegmentedControl from '@src/components/common/SegmentedControl';
import ClimbingDescription from '@src/components/climbing/ClimbingDescription';

export type ViewType = 'climbing' | 'review';

const ClimbingTerminatePage = ({ name: headerText }: { name: string }) => {
  const [selectedView, setSelectedView] = useState<ViewType>('review');
  const handleSegmentChange = (value: ViewType) => {
    setSelectedView(value);
  };
  const SEGMENTED_BUTTON_CONFIG: { value: ViewType; label: string }[] = [
    { value: 'climbing', label: '클라이밍' },
    { value: 'review', label: '감상평' },
  ];

  return (
    <>
      <Header text={headerText} headerType='back' />
      <Main>
        <SegmentedControl
          config={SEGMENTED_BUTTON_CONFIG}
          onSegmentChange={handleSegmentChange}
          defaultValue='review'
        />
        <ClimbingDescription />
        {selectedView === 'climbing' && <ClimbingBoard />}
        {selectedView === 'review' && <ReviewBoard />}
      </Main>
    </>
  );
};

export default ClimbingTerminatePage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.875rem;
  gap: 1.25rem;
  background-color: ${({ theme }) => theme.colors.neutral50};
  min-height: calc(100% - 4.375rem);
  position: relative;
  height: calc(100% - 4.375rem);
  margin-top: 100px;
`;
