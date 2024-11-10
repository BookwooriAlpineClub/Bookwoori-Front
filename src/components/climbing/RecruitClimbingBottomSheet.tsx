import styled from 'styled-components';
import { ReactComponent as Plus } from '@src/assets/icons/hi_outline_plus.svg';
import RecruitClimbingItem from '@src/components/climbing/RecruitClimbingItem';

interface BookInfo {
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  itemPage: number;
  description: string;
  isbn13: string;
  cover: string;
}

interface ClimbingEvent {
  climbingId: number;
  status: 'READY' | 'ONGOING' | 'FINISHED';
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  isOwner: boolean;
  bookInfo: BookInfo;
}

const recruitingClimbingList: ClimbingEvent[] = [
  {
    climbingId: 2,
    status: 'READY',
    name: '클라이밍 제목',
    startDate: '2024-11-05',
    endDate: '2024-11-08',
    description:
      '클라이밍에 대한 메모가 적히는 곳. 클라이밍에 대한 메모가 적히는 곳. 클라이밍에 대한 메모가 적히는 곳. 클라이밍에 대한 메모가 적히는 곳. 클라이밍에 대한 메모가 적히는 곳. ',
    memberCount: 2,
    isJoined: true,
    isOwner: true,
    bookInfo: {
      title: '지구 끝의 온실',
      author: '김초엽 (지은이)',
      publisher: '자이언트북스',
      pubDate: '2021-08-18',
      itemPage: 392,
      description:
        '김초엽 첫 장편소설. 『우리가 빛의 속도로 갈 수 없다면』을 통해 이미 폭넓은 독자층을 형성하며 열렬한 사랑을 받고 있는 김초엽 작가는 더스트로 멸망한 이후의 세계를 첫 장편소설의 무대로 삼았다.',
      isbn13: '9791191824001',
      cover:
        'https://image.aladin.co.kr/product/27692/63/coversum/s222930473_1.jpg',
    },
  },
  {
    climbingId: 3,
    status: 'READY',
    name: 'string',
    startDate: '2024-11-06',
    endDate: '2024-11-08',
    description: 'string',
    memberCount: 1,
    isJoined: true,
    isOwner: false,
    bookInfo: {
      title: '지구 끝의 온실',
      author: '김초엽 (지은이)',
      publisher: '자이언트북스',
      pubDate: '2021-08-18',
      itemPage: 392,
      description:
        '김초엽 첫 장편소설. 『우리가 빛의 속도로 갈 수 없다면』을 통해 이미 폭넓은 독자층을 형성하며 열렬한 사랑을 받고 있는 김초엽 작가는 더스트로 멸망한 이후의 세계를 첫 장편소설의 무대로 삼았다.',
      isbn13: '9791191824001',
      cover:
        'https://image.aladin.co.kr/product/27692/63/coversum/s222930473_1.jpg',
    },
  },
  {
    climbingId: 4,
    status: 'READY',
    name: 'string',
    startDate: '2024-11-06',
    endDate: '2024-11-08',
    description: 'string',
    memberCount: 1,
    isJoined: false,
    isOwner: false,
    bookInfo: {
      title: '지구 끝의 온실',
      author: '김초엽 (지은이)',
      publisher: '자이언트북스',
      pubDate: '2021-08-18',
      itemPage: 392,
      description:
        '김초엽 첫 장편소설. 『우리가 빛의 속도로 갈 수 없다면』을 통해 이미 폭넓은 독자층을 형성하며 열렬한 사랑을 받고 있는 김초엽 작가는 더스트로 멸망한 이후의 세계를 첫 장편소설의 무대로 삼았다.',
      isbn13: '9791191824001',
      cover:
        'https://image.aladin.co.kr/product/27692/63/coversum/s222930473_1.jpg',
    },
  },
];

const RecruitClimbingBottomSheet = () => {
  const handleClick = () => {
    // 클라이밍 추가 페이지 이동
  };

  return (
    <>
      <SWrapper>
        <span>모집 중인 등반</span>
        <button type='button' onClick={handleClick}>
          <Plus />
        </button>
      </SWrapper>
      <SContainer>
        {recruitingClimbingList.map((it) => (
          <RecruitClimbingItem key={it.climbingId} item={it} />
        ))}
      </SContainer>
    </>
  );
};

export default RecruitClimbingBottomSheet;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.625rem 0;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  height: 80vh;
  overflow: scroll;
`;
