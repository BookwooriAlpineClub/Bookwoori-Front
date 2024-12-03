import type { RecordDetail, RecordEdit } from '@src/types/apis/record';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@src/components/book/Header';
import BookInfoDetail from '@src/components/book/BookInfoDetail';
import InputStatus from '@src/components/book/InputStatus';
import InputPeriod, { type Period } from '@src/components/book/InputPeriod';
import InputPage from '@src/components/book/InputPage';
import InputReview from '@src/components/book/InputReview';

type Data = RecordEdit &
  Pick<RecordDetail, 'bookInfo'> & {
    type: 'book' | 'record';
  };

const mock: Data = {
  type: 'record',
  isbn13: '9788936434595',
  status: 'FINISHED',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  currentPage: 0,
  star: 3,
  reviewContent: '',
  bookInfo: {
    title: '',
    author: 'string',
    publisher: 'string',
    pubDate: 'string',
    itemPage: 0,
    description: 'string',
    isbn13: 'string',
    cover: 'string',
  },
};

const RecordEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    type,
    isbn13,
    status: readingStatus,
    startDate,
    endDate,
    currentPage,
    star,
    reviewContent,
    bookInfo,
  }: Data = mock;

  const [status, setStatus] = useState<RecordEdit['status']>(readingStatus);
  const [period, setPeriod] = useState<Period>({
    start: startDate,
    end: endDate,
  });
  const [page, setPage] = useState<number>(currentPage);
  const [num, setNum] = useState<number>(star);
  const [str, setStr] = useState<string>(reviewContent);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지 (기본 기능 비활성화)
    event.preventDefault();

    // API put 요청

    // 요청 성공 시 리다이렉트
    const path = location.pathname.replace(/\/edit$/, '');
    navigate(path, { replace: true });
  };

  return (
    <Container>
      <Header buttonList={['save']} />
      <BookInfoDetail readingStatus='UNREAD' {...bookInfo} />
      <Form onSubmit={handleFormSubmit}>
        <InputStatus
          name='status'
          setValue={setStatus}
          readingStatus={readingStatus}
        />
        {(status === 'READING' || status === 'FINISHED') && (
          <InputPeriod
            name='독서 기간'
            value={period}
            setValue={setPeriod}
            readingStatus={status}
          />
        )}
        {status === 'READING' && (
          <InputPage
            name='독서 현황'
            value={page}
            setValue={setPage}
            currentPage={currentPage}
            itemPage={bookInfo.itemPage}
          />
        )}
        {status === 'FINISHED' && (
          <InputReview
            name={{ num: '별점', str: '줄글' }}
            num={num}
            setNum={setNum}
            str={str}
            setStr={setStr}
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

export default RecordEditPage;

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
