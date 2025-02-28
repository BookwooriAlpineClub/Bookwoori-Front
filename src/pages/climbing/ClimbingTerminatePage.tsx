import ClimbingBoard from '@src/components/climbing/ClimbingBoard';
import Header from '@src/components/common/Header';
import { useState } from 'react';
import styled from 'styled-components';
import ReviewBoard from '@src/components/climbing/ReviewBoard';
import SegmentedControl from '@src/components/common/SegmentedControl';
import CompleteCard from '@src/components/climbing/CompleteCard';
import ClimbingDescription from '@src/components/climbing/ClimbingDescription';

export type ViewType = 'climbing' | 'review';

const ClimbingTerminatePage = ({ name: headerText }: { name: string }) => {
  const [selectedView, setSelectedView] = useState<ViewType>('climbing');
  const handleSegmentChange = (value: ViewType) => {
    setSelectedView(value);
  };
  const SEGMENTED_BUTTON_CONFIG: { value: ViewType; label: string }[] = [
    { value: 'climbing', label: '등반' },
    { value: 'review', label: '감상평' },
  ];

  return (
    <>
      <Header text={headerText} headerType='back' />
      <Main>
        <SegmentedControl
          config={SEGMENTED_BUTTON_CONFIG}
          onSegmentChange={handleSegmentChange}
          defaultValue={selectedView}
        />
        {selectedView === 'climbing' && (
          <>
            <CompleteCard />
            <ClimbingBoard />
          </>
        )}
        {selectedView === 'review' && (
          <>
            <ClimbingDescription />
            <ReviewBoard />
          </>
        )}
      </Main>
    </>
  );
};

export default ClimbingTerminatePage;

const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.neutral50};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap['16']};
`;
