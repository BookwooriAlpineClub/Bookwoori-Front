interface ApiResponse {
  name: string;
  adminName: string; // 방장 이름
  memberCount: number; // 멤버 수
  creationDate: string;
  description: string;
  imageUrl: string;
}

export interface CommunityInfoType {
  name: string;
  memberInfo: string; // 방장 이름 + 멤버 수
  creationDate: string;
  description: string;
  imageUrl: string;
}

export type CommunityRoleType = 'admin' | 'user';

const mockApiResponse: ApiResponse = {
  name: '피크민을 하자',
  adminName: '일이삼사오육칠팔구십',
  memberCount: 25,
  creationDate: '2000.99.99',
  imageUrl: '/path/to/image.jpg',
  description:
    '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이' +
    '삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사' +
    '오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육' +
    '칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔' +
    '구십일이삼사오육칠팔구십',
};

const defaultCommunityData: CommunityInfoType = {
  name: '',
  memberInfo: '',
  creationDate: '',
  description: '',
  imageUrl: '',
} as const;

  const headerText = '공동체 정보 및 설정 보기';
  const [communityInfoData, setCommunityInfoData] =
    useState<CommunityInfoType>(defaultCommunityData);
  // api response에 역할이 없어 임의 설정
  const communityRole: CommunityRoleType = 'admin';

  // loading, error 상태 관리
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // loading, error 페이지 렌더링
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
