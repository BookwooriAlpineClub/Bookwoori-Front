import type { Record } from '@src/types/apis/record';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { SESSION_STORAGE } from '@src/constants/sessionStorage';
import useBook from '@src/hooks/query/useBook';
import styled from 'styled-components';
import Header from '@src/components/book/Header';
import BookInfoDetail from '@src/components/book/BookInfoDetail';

const BookDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId: isbn13 } = useParams<{ bookId: string }>();
  const { bookDetail: bookInfo } = useBook({ isbn13 });

  const readingStatus: Record['readingStatus'] = 'UNREAD';

  const handleEditClick = () => {
    const jsonData = JSON.stringify({
      type: 'book',
      isbn13: bookInfo.isbn13,
      status: 'UNREAD',
      startDate: '',
      endDate: '',
      currentPage: -1,
      star: -1,
      reviewContent: '',
      bookInfo: {
        title: bookInfo.title,
        author: bookInfo.author,
        publisher: bookInfo.publisher,
        pubDate: bookInfo.pubDate,
        itemPage: bookInfo.itemPage,
        description: bookInfo.description,
        isbn13: bookInfo.isbn13,
        cover: bookInfo.coverImg,
      },
    });
    sessionStorage.setItem(SESSION_STORAGE.RECORD_EDIT, jsonData);
    navigate(`${location.pathname.replace('/book', '/record')}/edit`);
  };

  return (
    <Container>
      <Header buttonList={['edit']} handleEditClick={handleEditClick} />
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

  &::before {
    content: '';

    position: absolute;
    top: 6.69rem;
    left: 0;
    z-index: -1;

    width: 100%;
    height: -webkit-fill-available;

    border-radius: 1.125rem 1.125rem 0rem 0rem;
    background-color: ${({ theme }) => theme.colors.neutral0};
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
