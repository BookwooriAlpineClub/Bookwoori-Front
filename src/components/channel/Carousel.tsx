import styled from 'styled-components';
import { ReactComponent as Button } from '@src/assets/images/channel/carousel_btn.svg';
import { useState } from 'react';

const list = [
  {
    url: 'https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280',
    title: '제목',
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
    url: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdYlOA0%2FbtrR9G3Ht9p%2F0ikwVcuwMQLbSQ2kjY2Vrk%2Fimg.png',
    title: '제목 넘어가면??ㅇ',
  },
];

const Carousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (startIndex + itemsPerPage < list.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const displayedItems = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <SLayout>
      <SContainer>
        {displayedItems.map(({ url, title }) => (
          <SItem key={title}>
            <SImg src={url} />
            <SLabel>{title}</SLabel>
          </SItem>
        ))}
      </SContainer>
      <SButton onClick={handleNext} />
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
  overflow: hidden;
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
const SLabel = styled.label`
  position: absolute;
  bottom: 0.625rem;

  width: 4.0625rem;
  height: 15px;

  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.white};
  -webkit-text-stroke: 2px rgba(15, 16, 21, 0.4);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
