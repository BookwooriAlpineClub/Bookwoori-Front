import ClimbingProgressPage from '@src/pages/climbing/ClimbingProgressPage';
import ClimbingTerminatePage from '@src/pages/climbing/ClimbingTerminatePage';
import useLoaderData from '@src/hooks/useRoaderData';
import { useQuery } from '@tanstack/react-query';
import { getClimbing } from '@src/apis/climbing';
import LoadingPage from '@src/components/common/LoadingPage';

const ClimbingPage = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['climbing', climbingId],
    queryFn: () => getClimbing(climbingId),
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !data) {
    return <div>Error loading climbing data</div>;
  }

  return (
    <>
      {data.status === 'READY' && <h1>준비중</h1>}
      {data.status === 'RUNNING' && <ClimbingProgressPage />}
      {data.status === 'FINISHED' ||
        (data.status === 'FAILED' && <ClimbingTerminatePage />)}
    </>
  );
};

export default ClimbingPage;
