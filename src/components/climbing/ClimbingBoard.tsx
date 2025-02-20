import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import type { ClimbingMember } from '@src/types/climbing';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetClimbingMembers } from '@src/hooks/query/climbing';
import ClimbingRope from '@src/components/climbing/ClimbingRope';

const ClimbingBoard = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { participants } = useGetClimbingMembers(climbingId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY !== 0) {
        container.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <Layout ref={containerRef}>
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
