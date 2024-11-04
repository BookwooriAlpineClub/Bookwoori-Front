import styled from 'styled-components';
import { ReactComponent as Button } from '@src/assets/images/channel/carousel_btn.svg';
import { useEffect, useRef, useState } from 'react';

interface List {
  url: string;
  title: string;
}

const list: List[] = [
  {
    url: 'https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280',
    title: '소년이 온다',
  },
  {
    url: 'https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280',
    title: '제목',
  },
  {
    url: 'https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280',
    title: '제목',
  },
  {
    url: 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788936434595.jpg',
    title: '제목 넘어가면??ㅇ',
  },
  {
    url: 'https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280',
    title: '제목',
  },
  {
    url: 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788936434595.jpg',
    title: '제목 넘어가면??ㅇ',
  },
  {
    url: 'https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280',
    title: '제목',
  },
];

const Carousel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [carouselList] = useState<Array<List>>(list);
  const [width, setWidth] = useState<number>(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

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

  const getMoveItems = () => Math.floor(width / 85);

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
      handleScroll(85);
      return;
    }
    if (distanceX < -30 && vector > 2) handleScroll(-85);
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

  return (
    <SLayout>
      <SContainer
        ref={ref}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleClickStart}
        onMouseUp={handleClickEnd}
      >
        {carouselList.map(({ url, title }) => (
          <SItem key={title}>
            <SImg src={url} />
            <SLayer>
              <SLabel>{title}</SLabel>
            </SLayer>
          </SItem>
        ))}
      </SContainer>
      <SButton onClick={() => handleScroll(85)} />
    </SLayout>
  );
};

export default Carousel;

const SLayout = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;

  padding: 0.625rem;

  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.blue300};
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
const SButton = styled(Button)`
  cursor: pointer;
`;
const SItem = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
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
