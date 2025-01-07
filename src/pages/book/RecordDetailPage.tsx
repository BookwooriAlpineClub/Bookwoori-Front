import type { RecordDetailQueryRes } from '@src/types/apis/record';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import { SESSION_STORAGE } from '@src/constants/sessionStorage';
import { decodeIdParam } from '@src/utils/formatters';
import useRecord from '@src/hooks/query/useRecord';
import styled from 'styled-components';
import Header from '@src/components/book/Header';
import BookInfoDetail from '@src/components/book/BookInfoDetail';
import InputPeriod from '@src/components/book/InputPeriod';
import InputPage from '@src/components/book/InputPage';
import InputReview from '@src/components/book/InputReview';

const RecordDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recordId: params } = useParams<{ recordId: string }>();
  const recordId = decodeIdParam(params);
  const { recordDetail } = useRecord({ recordId });
  const {
    readingStatus,
    startDate,
    currentPage,
    star,
    review,
    bookInfo,
  }: RecordDetail = recordDetail;
  const endDate = '2024-12-31'; // 나중에 수정
  // const { endDate } = review.record;
  const reviewContent = '';
  // const reviewContent = review.content;

  const handleEditClick = () => {
    const jsonData = JSON.stringify({
      type: 'record',
      isbn13: bookInfo.isbn13,
      status: readingStatus,
      startDate,
      endDate: review.record.endDate,
      currentPage,
      star,
      reviewContent: review.content,
      bookInfo,
    });
    sessionStorage.setItem(SESSION_STORAGE.RECORD_EDIT, jsonData);
    navigate(`${location.pathname}/edit`);
  };
  const handleDeleteClick = () => {
    // 나중에 삭제하시겠습니까? 다이얼로그 띄우기
    // API delete 요청
    navigate(ROUTE_PATH.libraryRecord, { replace: true });
  };

  return (
    <Container>
      <Header
        buttonList={['edit', 'delete']}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      <BookInfoDetail readingStatus={readingStatus} {...bookInfo} />
      <Form>
        {(readingStatus === 'READING' || readingStatus === 'FINISHED') && (
          <InputPeriod
            name='독서 기간'
            readOnly
            value={{ start: startDate, end: endDate }}
            readingStatus={readingStatus}
          />
        )}
        {readingStatus === 'READING' && (
          <InputPage
            name='독서 현황'
            readOnly
            currentPage={currentPage}
            itemPage={bookInfo.itemPage}
          />
        )}
        {readingStatus === 'FINISHED' && (
          <InputReview
            name={{ num: '별점', str: '줄글' }}
            readOnly
            num={star}
            str={reviewContent}
          />
        )}
      </Form>
      <Description>
        <h2>책 소개</h2>
        <p>{bookInfo.description}</p>
      </Description>
    </Container>
  );
};

export default RecordDetailPage;

const Container = styled.div`
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  gap: 1.56rem;

  padding: 1.875rem 7%;

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
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 1.56rem;
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
