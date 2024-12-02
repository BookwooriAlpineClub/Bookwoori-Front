import type { Review } from '@src/types/apis/record';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';
import ReviewItem from '@src/components/book/ReviewItem';

const mock: Review[] = [
  {
    reviewId: 1,
    recordId: 1,
    star: 3,
    reviewContent:
      '책 평가는 리스트 페이지에서 최대 3줄까지 표시됩니다. 3줄을 초과하는 텍스트의 경우, 3줄을 넘는 부분은 말줄임표로 생략됩니다.',
    bookInfo: {
      title: '책 이름. 아주 길고 긴 책 이름. 책 이름이 너무 길어서 생략됨.',
      author:
        '작가 이름. 아주 길고 긴 작가 이름. 작가 이름이 너무 길어서 생략됨.',
      publisher: '출판사 이름',
      pubYear: '2023',
      itemPage: 203,
      description: '책 소개',
      isbn13: '0',
      cover: '',
    },
  },
  {
    reviewId: 2,
    recordId: 2,
    star: 5,
    reviewContent:
      '정말 재미있었다. 노벨문학상을 수상한 한강 작가의 글을 잘 읽었다.',
    bookInfo: {
      title: '디 에센셜 한강 (무선 보급판) - 2024 노벨문학상 수상작가',
      author: '한강 (지은이)',
      publisher: '문학동네',
      pubYear: '2023',
      itemPage: 364,
      description:
        '작가의 핵심 작품들을 큐레이팅하여 한 권으로 엮은 스페셜 에디션 ‘디 에센셜The essential’. 문학동네에서 출시하는 디 에센셜 한국작가 편은 ‘센세이션’이라는 키워드 아래, 독자들에게 강렬한 독서 경험을 선사하며 한국문학에 센세이션을 일으킨 작가를 선정한다. 첫번째 작가는 한강이다.',
      isbn13: '0',
      cover:
        'https://image.aladin.co.kr/product/31784/0/coversum/8954693466_2.jpg',
    },
  },
  {
    reviewId: 4,
    recordId: 4,
    star: 1,
    reviewContent: '추억이 새록새록. 이 동화책을 아주 어릴 때 읽었었다.',
    bookInfo: {
      title: '누가 내 머리에 똥 쌌어?',
      author: '베르너 홀츠바르트 (글), 볼프 에를브루흐 (그림)',
      publisher: '사계절',
      pubYear: '2002',
      itemPage: 20,
      description:
        '어느 날, 두더지는 기분 좋게 땅 위로 올라왔다가 그만 똥세례를 받는다. 화가 난 두더지는 누가 자기 머리 위에 똥을 쌌는지 알아내려고 길을 나선다. 하지만, 만나는 동물마다 자신의 똥을 직접 보여주면서, 자신이 범인이 아니라고 한다. 그러는 과정에서 두더지는 정육점집 개 한스가 자신의 머리 위에 똥을 쌌다는 것을 알게 된다.',
      isbn13: '0',
      cover:
        'https://image.aladin.co.kr/product/3/34/cover500/8971968419_2.jpg',
    },
  },
  {
    reviewId: 3,
    recordId: 3,
    star: 4,
    reviewContent: '특히 흥미로웠다.',
    bookInfo: {
      title: '흰 - 2024 노벨문학상 수상작가, 한강 소설',
      author: '한강 (지은이), 최진혁 (사진)',
      publisher: '문학동네',
      pubYear: '2018',
      itemPage: 196,
      description:
        '2018년 봄, 한강 작가의 소설 &lt;흰&gt;을 새롭게 선보인다. 이 년 전 오월에 세상에 나와 빛의 겹겹 오라기로 둘러싸인 적 있던 그 &lt;흰&gt;에 새 옷을 입히게 된 건 소설 발간에 즈음해 행했던 작가의 퍼포먼스가 글과 함께 배었으면 하는 바람에서였다.',
      isbn13: '0',
      cover:
        'https://image.aladin.co.kr/product/14322/3/coversum/8954651135_3.jpg',
    },
  },
];

const ReviewListPage = () => {
  const reviewList: Review[] = mock;

  return (
    <NoDataTextLayout>
      <Header text='책 평가' headerType='back' />
      <main>
        {reviewList.length !== 0 ? (
          <Ul>
            {reviewList.map((item) => (
              <ReviewItem key={item.reviewId} {...item} />
            ))}
          </Ul>
        ) : (
          <strong>감상평을 작성해 주세요.</strong>
        )}
      </main>
    </NoDataTextLayout>
  );
};

export default ReviewListPage;

const Ul = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.94rem;
`;
