import styled from 'styled-components';
import { ReactComponent as Climber } from '@src/assets/icons/md_directions_walk.svg';
import { useRef, useState, useEffect } from 'react';
import {
  ClimbingReadingStatus,
  ClimbingReadingStatusType,
} from '@src/constants/constants';

type ProgressBarProps = {
  height: number;
  page: number;
  isChanged: number;
  status: ClimbingReadingStatusType;
};

const ProgressBar = ({ height, page, isChanged, status }: ProgressBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, [isChanged]);

  return (
    <ProgressBarContainer ref={containerRef}>
      <Bar>
        <Progress height={containerHeight * height}>
          <SClimber $status={status === ClimbingReadingStatus.FINISHED} />
          <Pages $status={status === ClimbingReadingStatus.FINISHED}>
            {page}p
          </Pages>
        </Progress>
      </Bar>
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
const Bar = styled.div`
  position: relative;

  width: 0.75rem;

  border-radius: 6.1875rem 6.1875rem 0 0;
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const Progress = styled.div<{ height: number }>`
  position: absolute;
  bottom: 0;

  height: ${({ height }) => height}px;
  width: 100%;

  border-radius: 6.1875rem 6.1875rem 0 0;
  background-color: ${({ theme }) => theme.colors.lime300};
`;
const SClimber = styled(Climber)<{ $status: boolean }>`
  position: absolute;
  left: ${({ $status }) => ($status ? '-1.9rem' : '-0.8rem')};
  top: ${({ $status }) => ($status ? '-3rem' : '-2.89rem')};

  width: 2.5rem;
  height: 3.75rem;
  color: ${({ theme }) => theme.colors.neutral400};
`;
const Pages = styled.span<{ $status: boolean }>`
  position: absolute;
  top: -3.2rem;
  left: ${({ $status }) => ($status ? '-1.4rem' : '-0.4rem')};

  min-width: 1.5625rem;
  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.neutral400};
  text-align: center;
`;
