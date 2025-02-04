import Book from '@src/types/book';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import { decodeIdParam } from '@src/utils/formatters';
import {
  useGetRecordDetail,
  usePostRecord,
  usePatchRecord,
  useDeleteRecord,
} from '@src/hooks/query/record';
import { useGetBookDetail } from '@src/hooks/query/book';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import BookDetail from '@src/components/library/BookDetail';
import PageField from '@src/components/library/PageField';
import ReviewField from '@src/components/library/ReviewField';

const RecordDetailPage = () => {
  const { bookId: isbn13 = '' } = useParams<{ bookId: string }>();
  const {
    data: { title, author, cover, publisher, pubDate, description, itemPage },
  } = useGetBookDetail(isbn13);
  const [isTop, setIsTop] = useState<boolean>(true);

  const navigate = useNavigate();
  const handleScroll = () => {
    setIsTop(window.scrollY < 70);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container $cover={cover}>
      <SHeader text='' headerType='back' $isTop={isTop} />
      <main>
        <BookDetail
          title={title}
          author={author}
          cover={cover}
          publisher={publisher}
          pubDate={pubDate}
          itemPage={itemPage}
        />
        <Description>{description}</Description>
      </main>
    </Container>
  );
};

export default RecordDetailPage;

const Container = styled.div<{ $cover: Book['cover'] }>`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[16]};

  &::before {
    content: '';

    position: absolute;
    z-index: -2;

    opacity: 60%;
    background: url(${({ $cover }) => $cover}) center / cover no-repeat;
    filter: blur(12px);
  }
  &::after {
    content: '';

    position: absolute;
    top: 6.69rem;
    left: 0;
    z-index: -1;

    width: 100%;
    height: -webkit-fill-available;

    border-radius: ${({ theme }) =>
      `${theme.rounded[16]} ${theme.rounded[16]} 0 0`};
    background-color: ${({ theme }) => theme.colors.neutral0};
  }
`;
const SHeader = styled(Header)<{ $isTop: boolean }>`
  background-color: ${({ $isTop, theme }) =>
    $isTop ? 'transparent' : theme.colors.neutral0};
`;
const Description = styled.p`
  ${({ theme }) => theme.fonts.body}
`;
