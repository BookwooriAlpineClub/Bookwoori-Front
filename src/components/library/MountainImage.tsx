import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import UserAvatar from '@src/components/common/UserAvatar';
import { Mountains } from '@src/constants/constants';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const remToPx = (rem: number): number =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

const MountainImage = ({
  mountainData,
  seasonalColor,
}: {
  mountainData: {
    mountainLevel: number;
    myHeight: number;
    profileImg?: string;
    profileName: string;
  };
  seasonalColor: string[];
}) => {
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(170);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const pathRef = useRef<SVGPathElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const profileCircleSize = remToPx(2.5);
  // const formattedMountainLength =
  //   mountainData.mountainLevel === 10
  //     ? Mountains[mountainData.mountainLevel].mountainHeight
  //     : Mountains[mountainData.mountainLevel + 1].mountainHeight -
  //       Mountains[mountainData.mountainLevel].mountainHeight;
  const formattedMountainLength = 100;

  const formattedMyHeight =
    mountainData.mountainLevel === 10
      ? mountainData.myHeight
      : mountainData.myHeight -
        Mountains[mountainData.mountainLevel - 1].mountainHeight;
  const expRatio = (formattedMyHeight / formattedMountainLength) * 100;
  console.log(mountainData);
  console.log(formattedMountainLength, formattedMyHeight, expRatio);

  useEffect(() => {
    setProgress(0);
    setIsAnimationComplete(false);
    if (pathRef.current) {
      const totalLength = pathRef.current.getTotalLength();
      setPathLength(totalLength);
    }
  }, []);
  useEffect(() => {
    if (pathLength !== null) {
      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progressValue = Math.min((elapsed / 3000) * 100, 100);

        setProgress(progressValue);
        if (pathRef.current) {
          const lengthAtProgress = (pathLength * progressValue) / 100;
          const point = pathRef.current.getPointAtLength(lengthAtProgress);
          setCirclePosition({ x: point.x, y: point.y });
        }

        if (progressValue < expRatio) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimationComplete(true);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [pathLength]);

  return (
    <MountainContainer seasonalColor={seasonalColor}>
      {/* 산 */}
      <Mountain>
        <Path>
          <svg
            viewBox='0 0 100 100'
            xmlns='http://www.w3.org/2000/svg'
            width='auto'
            height='100%'
          >
            <path
              ref={pathRef}
              d='M50 100
              Q5 85, 50 80
              Q90 75, 50 55
              Q20 45, 55 15
              Q60 10, 50 0'
              fill='none'
              stroke='#ffffff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M50 100
              Q5 85, 50 80
              Q90 75, 50 55
              Q20 45, 55 15
              Q60 10, 50 0'
              fill='none'
              stroke={seasonalColor[1]}
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength - (pathLength * progress) / 100}
              style={{
                transition: 'stroke-dashoffset 16ms linear',
              }}
            />
            <foreignObject
              x={circlePosition.x - profileCircleSize / 2}
              y={circlePosition.y - profileCircleSize / 2}
              width={profileCircleSize}
              height={profileCircleSize}
            >
              <div
                {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as {
                  xmlns: string;
                })}
                style={{
                  width: 'fit-content',
                  height: '100%',
                  transform: 'scale(0.3)',
                }}
                data-tooltip-id='avatar-tooltip'
                data-tooltip-content={`현재 ${mountainData.myHeight}m`}
              >
                <Tooltip
                  id='avatar-tooltip'
                  isOpen={isAnimationComplete}
                  className='tooltip-style'
                />
                <UserAvatar
                  profileImg={mountainData.profileImg ?? ''}
                  nickname={mountainData.profileName}
                />
              </div>
            </foreignObject>
          </svg>
        </Path>
      </Mountain>
    </MountainContainer>
  );
};

export default MountainImage;

const MountainContainer = styled.div<{ seasonalColor: string[] }>`
  position: relative;
  width: 100%;
  height: 70%;

  background: linear-gradient(
    to top,
    ${({ seasonalColor }) => seasonalColor[0]},
    ${({ seasonalColor }) => seasonalColor[1]}
  );
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);

  .tooltip-style {
    background-color: ${({ theme }) => theme.colors.lime100};
    color: ${({ theme }) => theme.colors.neutral950};
    padding: ${({ theme }) => theme.padding['2']}
      ${({ theme }) => theme.padding['6']};
    font-size: 70%;
    opacity: 100%;
    border-radius: ${({ theme }) => theme.rounded['8']};
  }
`;

const Mountain = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
`;

const Path = styled.div`
  height: 100%;
`;
