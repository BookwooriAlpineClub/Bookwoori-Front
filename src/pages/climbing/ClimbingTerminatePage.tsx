import ClimbingBoard from '@src/components/climbing/ClimbingBoard';
import Header from '@src/components/common/Header';
import { useState } from 'react';
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
      <main>
        <SegmentedControl
          config={SEGMENTED_BUTTON_CONFIG}
          onSegmentChange={handleSegmentChange}
          defaultValue='review'
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
      </main>
    </>
  );
};

export default ClimbingTerminatePage;
