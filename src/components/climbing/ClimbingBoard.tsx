import styled from 'styled-components';
import ClimbingRope from '@src/components/climbing/ClimbingRope';
import useClimbing from '@src/hooks/query/useClimbing';
import useLoaderData from '@src/hooks/useRoaderData';
import { ClimbingParticipants } from '@src/types/domain/climbingTemp';

const ClimbingBoard = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { participants } = useClimbing(climbingId);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    if (event.deltaY !== 0) {
      container.scrollLeft += event.deltaY; 
      event.preventDefault(); 
    }
  };

  return (
    <Layout onWheel={handleWheel}>
      {participants?.map((it: ClimbingParticipants) => (
        <ClimbingRope key={it.memberId} item={it} />
      ))}
    </Layout>
  );
};

export default ClimbingBoard;

const Layout = styled.div`
  display: flex;
  justify-content: space-around;

  height: 100%;

  overflow-x: scroll;
`;
