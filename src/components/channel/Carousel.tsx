import styled from 'styled-components';
import { ReactComponent as Button } from '@src/assets/images/channel/carousel_btn.svg';

const Carousel = () => {
  return (
    <SLayout>
      <SContainer>
        <SItem>
          <SImg src='https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280' />
          <SLabel>제목</SLabel>
        </SItem>
        <SItem>
          <SImg src='https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280' />
          <SLabel>제목</SLabel>
        </SItem>
        <SItem>
          <SImg src='https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280' />
          <SLabel>제목</SLabel>
        </SItem>
        <SItem>
          <SImg src='https://books.google.co.kr/books/publisher/content?id=Q7uTBgAAQBAJ&hl=ko&pg=PA1&img=1&zoom=3&bul=1&sig=ACfU3U1p_z0yHTZfg8DprIuejZmfE_AHhA&w=1280' />
          <SLabel>제목</SLabel>
        </SItem>
      </SContainer>
      <SButton />
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

  //   transform: translate(-50%, -50%);

  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.white};
  -webkit-text-stroke-width: 2;
  -webkit-text-stroke-color: rgba(15, 16, 21, 0.4);
`;
