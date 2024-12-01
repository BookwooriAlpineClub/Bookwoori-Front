import type { BookDetail } from '@src/types/apis/book';
import type { Record } from '@src/types/apis/record';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@src/components/book/Header';
import BookInfoDetail from '@src/components/book/BookInfoDetail';

const mockBook: BookDetail = {
  title: '누가 내 머리에 똥 쌌어?',
  author: '베르너 홀츠바르트 (글), 볼프 에를브루흐 (그림)',
  publisher: '사계절',
  pubYear: '2002',
  itemPage: 20,
  description:
    '어느 날, 두더지는 기분 좋게 땅 위로 올라왔다가 그만 똥세례를 받는다. 화가 난 두더지는 누가 자기 머리 위에 똥을 쌌는지 알아내려고 길을 나선다. 하지만, 만나는 동물마다 자신의 똥을 직접 보여주면서, 자신이 범인이 아니라고 한다. 그러는 과정에서 두더지는 정육점집 개 한스가 자신의 머리 위에 똥을 쌌다는 것을 알게 된다.',
  isbn13: '-1',
  cover: 'https://image.aladin.co.kr/product/3/34/cover500/8971968419_2.jpg',
};
const mockRecord: Record = {
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
  const location = useLocation();

  let buttonList: ('edit' | 'delete' | 'save')[];
  let bookDetail: BookDetail;
  let status: 'BOOK' | 'WISH' | 'READING' | 'FINISHED';

  if (location.pathname.includes('book')) {
    const bookInfo: BookDetail = mockBook;
    buttonList = ['edit'];
    status = 'BOOK';
    bookDetail = bookInfo;
  } else {
    const {
      readingStatus,
      startDate,
      endDate,
      currentPage,
      star,
      reviewContent,
      bookInfo,
    }: Record = mockRecord;
    buttonList = ['edit', 'delete'];
    status = readingStatus;
    bookDetail = bookInfo;
  }

  return (
    <Container>
      <Header buttonList={buttonList} />
      <BookInfoDetail status={status} {...bookDetail} />
      <Description>
        <h2>책 소개</h2>
        <p>{bookDetail.description}</p>
      </Description>
    </Container>
  );
};

export default RecordDetailPage;

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
