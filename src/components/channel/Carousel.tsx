import styled from 'styled-components';
import { ReactComponent as Next } from '@src/assets/images/channel/carousel_btn.svg';
import { ReactComponent as More } from '@src/assets/images/channel/carousel_more_btn.svg';
import { useEffect, useRef, useState } from 'react';
import useBottomsheet from '@src/hooks/useBottomsheet';
import RecruitClimbingBottomSheet from '@src/components/climbing/RecruitClimbingBottomSheet';
import { ClimbingInfo } from '@src/types/domain/climbingTemp';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';

const Carousel = ({
  type,
  list,
}: {
  type: 'next' | 'more';
  list: ClimbingInfo[];
}) => {
  const CAROUSEL_ITEM_WIDTH = 85;
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const { openBottomsheet, closeBottomsheet } = useBottomsheet();

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const getMoveItems = () => Math.floor(width / CAROUSEL_ITEM_WIDTH);

  const handleScroll = (direction: number) => {
    const item = ref.current;
    if (!item) return;

    const moveItems = getMoveItems();

    item.scrollTo({
      left: item.scrollLeft + direction * moveItems,
      behavior: 'smooth',
    });
  };

  const handleSwipe = (distanceX: number, vector: number) => {
    if (distanceX > 30 && vector > 2) {
      handleScroll(CAROUSEL_ITEM_WIDTH);
      return;
    }
    if (distanceX < -30 && vector > 2) handleScroll(CAROUSEL_ITEM_WIDTH * -1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.changedTouches[0].pageX);
    setStartY(e.changedTouches[0].pageY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const distanceX = startX - e.changedTouches[0].pageX;
    const distanceY = startY - e.changedTouches[0].pageY;
    const vector = Math.abs(distanceX / distanceY);

    handleSwipe(distanceX, vector);
  };

  const handleClickStart = (e: React.MouseEvent) => {
    setStartX(e.pageX);
    setStartY(e.pageY);
  };

  const handleClickEnd = (e: React.MouseEvent) => {
    const distanceX = startX - e.pageX;
    const distanceY = startY - e.pageY;
    const vector = Math.abs(distanceX / distanceY);

    handleSwipe(distanceX, vector);
  };

  const handleClickMoreButton = () => {
    openBottomsheet(
      <RecruitClimbingBottomSheet closeBottomSheet={closeBottomsheet} />,
    );
  };

  const handClickNextButton = () => {
    handleScroll(CAROUSEL_ITEM_WIDTH);
  };

  const navigate = useEncodedNavigation();
  const handleClickNavigate = (climbingId: number) => {
    navigate('/climbing', climbingId);
  };

  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <SLayout ref={layoutRef}>
      {list.length === 0 ? (
        <Span>아직 등반이 없습니다.</Span>
      ) : (
        <>
          <SContainer
            ref={ref}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleClickStart}
            onMouseUp={handleClickEnd}
          >
            {list.map(({ name, cover, climbingId }) => (
              <SItem
                key={climbingId}
                onClick={
                  type === 'next'
                    ? () => handleClickNavigate(climbingId)
                    : () => {}
                }
                disabled={type === 'more'}
              >
                <SImg src={cover} />
                <SLayer>
                  <SLabel>{name}</SLabel>
                </SLayer>
              </SItem>
            ))}
          </SContainer>
          {type === 'next' ? (
            layoutRef.current &&
            layoutRef.current.offsetWidth <
              CAROUSEL_ITEM_WIDTH * list.length && (
              <button type='button' onClick={handClickNextButton}>
                <Next />
              </button>
            )
          ) : (
            <button type='button' onClick={handleClickMoreButton}>
              <More />
            </button>
          )}
        </>
      )}
    </SLayout>
  );
};

export default Carousel;

const SLayout = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;

  padding: 0.625rem;

  min-height: 6.25rem;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.blue300};
`;
const Span = styled.span`
  display: flex;
  width: 100%;
  justify-content: center;

  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black200};
`;
const SContainer = styled.div`
  display: flex;
  gap: 0.625rem;

  width: 100%;
  padding: 0 0.1563rem 0 0;
  overflow: hidden;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
const SItem = styled.button`
  display: flex;
  justify-content: center;
  position: relative;

  &:disabled {
    cursor: default;
  }
`;
const SImg = styled.img`
  width: 4.6875rem;
  height: 6.25rem;

  border-radius: 0.9375rem;
`;
const SLayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;

  width: 100%;
  height: 100%;
  padding: 0.625rem 0.3125rem;

  border-radius: 0.9375rem;
  background: linear-gradient(
    0deg,
    rgba(15, 16, 21, 0.4) 0%,
    rgba(15, 16, 21, 0.4) 100%
  );
`;
const SLabel = styled.label`
  width: 100%;

  text-align: center;
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.white};
  -webkit-text-stroke: 0.125rem rgba(15, 16, 21, 0.4);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
