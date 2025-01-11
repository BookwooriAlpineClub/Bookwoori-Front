import type {
  RecordDetailQueryRes,
  RecordAddReq,
  RecordEditReq,
} from '@src/types/apis/record';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { SESSION_STORAGE } from '@src/constants/sessionStorage';
// import useRecord from '@src/hooks/query/useRecord';
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
  type: 'book',
  isbn13: '',
  status: 'UNREAD',
  startDate: '',
  endDate: '',
  currentPage: -1,
  star: -1,
  reviewContent: '',
  bookInfo: {
    title: '채식주의자 (리마스터판) - 2024 노벨문학상 수상작가',
    author: '한강 (지은이)',
    publisher: '창비',
    pubDate: '2022-03-28',
    itemPage: 276,
    description:
      '2016년 인터내셔널 부커상을 수상하며 한국문학의 입지를 한단계 확장시킨 한강의 장편소설. 상처받은 영혼의 고통과 식물적 상상력의 강렬한 결합을 정교한 구성과 흡인력 있는 문체로 보여주며 섬뜩한 아름다움의 미학을 한강만의 방식으로 완성한 역작이다.',
    isbn13: '9788936434595',
    cover:
      'https://image.aladin.co.kr/product/29137/2/coversum/8936434594_2.jpg',
  },
};

const RecordEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { createRecord, updateRecord } = useRecord({ recordId });

  // const jsonData = sessionStorage.getItem(SESSION_STORAGE.RECORD_EDIT);
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
  // }: Data = JSON.parse(jsonData as string);

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
    console.log(type);
    console.log(isbn13);

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
    background-color: ${({ theme }) => theme.colors.neutral0};
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
