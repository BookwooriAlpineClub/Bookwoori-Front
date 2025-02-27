import ClimbingSummary from '@src/components/climbing/ClimbingSummary';
import ClimbingDetail from '@src/components/climbing/ClimbingDetail';
import useLoaderData from '@src/hooks/useRoaderData';
import Spinner from '@src/components/common/Spinner';
import styled from 'styled-components';
import { useGetClimbing } from '@src/hooks/query/climbing';

const ClimbingDescription = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { climbingInfo: data, isLoading } = useGetClimbing(climbingId);
  if (isLoading) return <Spinner />;
  if (!data) return null;

  return (
    <DescriptionContainer>
      <ClimbingSummary
        startDate={data.startDate}
        endDate={data.endDate}
        memberCount={data.memberCount}
        climbingId={climbingId}
      />
      <ClimbingDetail data={data} />
    </DescriptionContainer>
  );
};

export default ClimbingDescription;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.padding['16']};
  gap: ${({ theme }) => theme.gap['16']};

  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: ${({ theme }) => theme.rounded[24]};
`;
