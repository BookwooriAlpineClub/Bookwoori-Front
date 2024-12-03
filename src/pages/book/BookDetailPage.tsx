import type { BookDetail } from '@src/types/apis/book.d';
import type { Record } from '@src/types/apis/record';
import { useParams } from 'react-router-dom';
import useBook from '@src/hooks/query/useBook';
import styled from 'styled-components';
import Header from '@src/components/book/Header';
import BookInfoDetail from '@src/components/book/BookInfoDetail';

const BookDetailPage = () => {
  const { bookId: isbn13 } = useParams<{ bookId: string }>();
  const { bookDetail } = useBook({ isbn13 });
  const bookInfo = bookDetail as BookDetail;

  const readingStatus: Record['readingStatus'] = 'UNREAD';

  return (
    <Container>
      <Header buttonList={['edit']} />
      <BookInfoDetail
        readingStatus={readingStatus}
        cover={bookInfo.coverImg}
        {...bookInfo}
      />
      <Description>
        <h2>책 소개</h2>
        <p>{bookInfo.description}</p>
      </Description>
    </Container>
  );
};

export default BookDetailPage;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1.56rem;

  margin: 1.875rem 7% 0;

  header {
    margin-bottom: 0.315rem;
  }
`;
const Description = styled.section`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.94rem;

  h2 {
    ${({ theme }) => theme.fonts.mountain}
  }
  p {
    ${({ theme }) => theme.fonts.body}
  }
`;
