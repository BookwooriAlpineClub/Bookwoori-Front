import styled from 'styled-components';
import { ReactComponent as Climber } from '@src/assets/icons/climber_grey.svg';
import { useRef, useState, useEffect } from 'react';

const ProgressBar = ({
  height,
  page,
  isChanged,
}: {
  height: number;
  page: number;
  isChanged: number;
}) => {
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
          <SClimber />
          <Pages>{page}p</Pages>
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
  border: 1px solid ${({ theme }) => theme.colors.black400};
  background-color: ${({ theme }) => theme.colors.white};
`;
const Progress = styled.div<{ height: number }>`
  position: absolute;
  bottom: 0;

  height: ${({ height }) => height}px;
  width: 100%;

  border-radius: 6.1875rem 6.1875rem 0 0;
  background-color: ${({ theme }) => theme.colors.black400};
`;
const SClimber = styled(Climber)`
  position: absolute;
  left: -16px;
  top: -2.9375rem;

  width: 2.5rem;
  height: 3.75rem;
  fill: ${({ theme }) => theme.colors.blue200};
`;
const Pages = styled.span`
  position: absolute;
  left: 0.4375rem;
  top: -3rem;

  min-width: 1.5625rem;
  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.black200};
`;
