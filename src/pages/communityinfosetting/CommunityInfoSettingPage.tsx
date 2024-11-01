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
