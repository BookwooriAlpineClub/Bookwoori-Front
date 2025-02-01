import ClimbingSummary from '@src/components/climbing/ClimbingSummary';
import ClimbingDetail from '@src/components/climbing/ClimbingDetail';
import useLoaderData from '@src/hooks/useRoaderData';
import { useQuery } from '@tanstack/react-query';
import { getClimbing } from '@src/apis/climbing';
import Spinner from '@src/components/common/Spinner';
import Accordion from '@src/components/common/Accordion';

const ClimbingDescription = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['climbing', climbingId],
    queryFn: () => getClimbing(climbingId),
  });

  if (isLoading) return <Spinner />;
  if (isError || !data) return <div>Error</div>;

  return (
    <Accordion
      title={
        <ClimbingSummary
          startDate={data.startDate}
          endDate={data.endDate}
          memberCount={data.memberCount}
        />
      }
    >
      <ClimbingDetail data={data} />
    </Accordion>
  );
};

export default ClimbingDescription;
