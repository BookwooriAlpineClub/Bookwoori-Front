import type { Record } from '@src/types/apis/record';
import { useState } from 'react';
import styled from 'styled-components';
import Header from '@src/components/book/Header';
import BookInfoDetail from '@src/components/book/BookInfoDetail';
import InputPeriod, { type Period } from '@src/components/book/InputPeriod';

const mock: Record = {
  recordId: 1,
  memberId: 3,
  readingStatus: 'FINISHED',
  star: 0,
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  reviewContent: '안돼~~~~~',
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

const RecordDetailPage = () => {
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

  return (
    <Container>
      <Header buttonList={['edit', 'delete']} />
      <BookInfoDetail status={status} {...bookInfo} />
      {(status === 'READING' || status === 'FINISHED') && (
        <InputPeriod
          readingStatus={status}
          readonly
          value={period}
          setValue={setPeriod}
        />
      )}
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

  height: 100%;
  padding: 1.875rem 7% 0;

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
    height: 100%;

    border-radius: 1.125rem 1.125rem 0rem 0rem;
    background-color: ${({ theme }) => theme.colors.white};
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
