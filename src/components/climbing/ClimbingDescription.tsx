import Accordions from '@src/components/common/Accordions';
import ClimbingSummary from '@src/components/climbing/ClimbingSummary';
import ClimbingDetail from '@src/components/climbing/ClimbingDetail';

interface ClimbingDescriptionProps {
  empty?: boolean;
}

const ClimbingDescription = ({ empty }: ClimbingDescriptionProps) => {
  return (
    <Accordions title={<ClimbingSummary />}>
      <ClimbingDetail />
      <div>{empty}</div>
    </Accordions>
  );
};

export default ClimbingDescription;
