import styled from 'styled-components';
import type { ClimbingMember } from '@src/types/climbing';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetClimbingMembers } from '@src/hooks/query/climbing';
import ClimbingRope from '@src/components/climbing/ClimbingRope';

const ClimbingBoard = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { participants } = useGetClimbingMembers(climbingId);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    if (event.deltaY !== 0) {
      container.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  return (
    <Layout onWheel={handleWheel}>
      {participants
        ?.sort((a, b) => b.currentPage - a.currentPage)
        .map((it: ClimbingMember) => (
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
