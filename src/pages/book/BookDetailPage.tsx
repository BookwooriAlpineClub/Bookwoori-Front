import type Record from '@src/types/record';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { SESSION_STORAGE } from '@src/constants/sessionStorage';
import useBook from '@src/hooks/query/useBook';
import styled from 'styled-components';
import Header from '@src/components/library/Header';
import BookInfoDetail from '@src/components/library/BookInfoDetail';

const BookDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId: isbn13 } = useParams<{ bookId: string }>();
  const { bookDetail } = useBook({ isbn13 });

  const status: Record['status'] = 'UNREAD';

  const handleEditClick = () => {
    const jsonData = JSON.stringify({
      isbn13: '',
      title: '',
      author: '',
      cover: '',
      publisher: '',
      pubYear: '',
      description: '',
      itemPage: -1,
      records: [],
    });
    sessionStorage.setItem(SESSION_STORAGE.RECORD_EDIT, jsonData);
    navigate(`${location.pathname.replace('/book', '/record')}/edit`);
  };

  return (
    <Container>
      <Header buttonList={['edit']} handleEditClick={handleEditClick} />
      <BookInfoDetail status={status} {...bookDetail} />
      <Description>
        <h2>책 소개</h2>
        <p>{bookDetail.description}</p>
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
