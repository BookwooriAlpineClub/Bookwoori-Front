import type { BookDetail } from '@src/types/apis/book';
import type { Record } from '@src/types/apis/record';
import styled from 'styled-components';
import Header from '@src/components/book/Header';
import BookInfoDetail from '@src/components/book/BookInfoDetail';

const mock: BookDetail = {
  title: '누가 내 머리에 똥 쌌어?',
  author: '베르너 홀츠바르트 (글), 볼프 에를브루흐 (그림)',
  publisher: '사계절',
  pubDate: '2002',
  itemPage: 20,
  description:
    '어느 날, 두더지는 기분 좋게 땅 위로 올라왔다가 그만 똥세례를 받는다. 화가 난 두더지는 누가 자기 머리 위에 똥을 쌌는지 알아내려고 길을 나선다. 하지만, 만나는 동물마다 자신의 똥을 직접 보여주면서, 자신이 범인이 아니라고 한다. 그러는 과정에서 두더지는 정육점집 개 한스가 자신의 머리 위에 똥을 쌌다는 것을 알게 된다.',
  isbn13: '-1',
  coverImg: 'https://image.aladin.co.kr/product/3/34/cover500/8971968419_2.jpg',
};

const RecordDetailPage = () => {
  const bookInfo: BookDetail = mock;

  const readingStatus: Record['readingStatus'] = 'UNREAD';

  return (
    <Container>
      <Header buttonList={['edit']} />
      <BookInfoDetail readingStatus={readingStatus} {...bookInfo} />
      <Description>
        <h2>책 소개</h2>
        <p>{bookInfo.description}</p>
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
