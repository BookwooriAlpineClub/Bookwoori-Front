import styled from 'styled-components';
import ClimbingRope from '@src/components/climbing/ClimbingRope';

interface ClimbingMemberInfo {
  memberId: number;
  nickname: string;
  profileImg: string;
  memo: string | null;
  currentPage: number;
}

const climbingMemberList: ClimbingMemberInfo[] = [
  {
    memberId: 1,
    nickname: '김멤버',
    profileImg:
      'https://img.freepik.com/free-photo/beautiful-beach-sea_74190-6620.jpg',
    memo: null,
    currentPage: 500,
  },
  {
    memberId: 2,
    nickname: '이멤버',
    profileImg:
      'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp',
    memo: '메모메모',
    currentPage: 480,
  },
  {
    memberId: 1,
    nickname: '김멤버',
    profileImg:
      'https://images.mypetlife.co.kr/content/uploads/2023/07/07110007/AdobeStock_479535950-1024x683.jpeg',
    memo: null,
    currentPage: 200,
  },
  {
    memberId: 2,
    nickname: '이멤버',
    profileImg:
      'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp',
    memo: '메모메모',
    currentPage: 120,
  },
  {
    memberId: 1,
    nickname: '김멤버',
    profileImg:
      'https://images.mypetlife.co.kr/content/uploads/2023/07/07110007/AdobeStock_479535950-1024x683.jpeg',
    memo: null,
    currentPage: 90,
  },
  {
    memberId: 2,
    nickname: '이멤버',
    profileImg:
      'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp',
    memo: '메모메모',
    currentPage: 0,
  },
];

const ClimbingBoard = () => {
  return (
    <Layout>
      {climbingMemberList.map((item: ClimbingMemberInfo) => (
        <ClimbingRope key={item.memberId} item={item} />
      ))}
    </Layout>
  );
};

export default ClimbingBoard;

const Layout = styled.div`
  display: flex;

  height: 100%;
  padding: 0 0.625rem 0.625rem 0.625rem;

  background-color: ${({ theme }) => theme.colors.white};
  overflow: scroll;
`;
