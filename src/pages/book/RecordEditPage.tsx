import type { Record } from '@src/types/apis/record';
import { useState } from 'react';
import styled from 'styled-components';
import Header from '@src/components/book/Header';
import BookInfoDetail from '@src/components/book/BookInfoDetail';
import InputPeriod, { type Period } from '@src/components/book/InputPeriod';
import InputPage from '@src/components/book/InputPage';
import InputReview from '@src/components/book/InputReview';

const mock: Record = {
  recordId: 1,
  memberId: 3,
  readingStatus: 'FINISHED',
  star: 3,
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  reviewContent:
    '가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하',
  currentPage: 0,
  maxPage: 0,
  bookInfo: {
    title: '채식주의자 (리마스터판) - 2024 노벨문학상 수상작가',
    author: '한강 (지은이)',
    publisher: '창비',
    pubYear: '2022',
    itemPage: 276,
    description:
      '2016년 인터내셔널 부커상을 수상하며 한국문학의 입지를 한단계 확장시킨 한강의 장편소설. 상처받은 영혼의 고통과 식물적 상상력의 강렬한 결합을 정교한 구성과 흡인력 있는 문체로 보여주며 섬뜩한 아름다움의 미학을 한강만의 방식으로 완성한 역작이다.',
    isbn13: '9788936434595',
    cover:
      'https://image.aladin.co.kr/product/29137/2/coversum/8936434594_2.jpg',
  },
};

const RecordEditPage = () => {
  const {
    readingStatus,
    startDate,
    endDate,
    currentPage,
    star,
    reviewContent,
    bookInfo,
  }: Record = mock;

  const status = readingStatus;
  const [period, setPeriod] = useState<Period>({
    start: startDate,
    end: endDate,
  });
  const [page, setPage] = useState<number>(currentPage);
  const [num, setNum] = useState<number>(star);
  const [str, setStr] = useState<string>(reviewContent);

  const handleFormSubmit = () => {};

  return (
    <Container>
      <Header buttonList={['save']} />
      <BookInfoDetail status={status} {...bookInfo} />
      <Form onSubmit={handleFormSubmit}>
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
