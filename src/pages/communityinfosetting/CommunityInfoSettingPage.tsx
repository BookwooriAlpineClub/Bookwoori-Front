import React, { useEffect, useState } from 'react';
import CommunityInfoSection from '@src/components/communityinfosetting/CommunityInfoSection';
import { delay } from '@src/utils/helpers';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import CommunitySettingSection from '@src/components/communityinfosetting/CommunitySettingSection';

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

const CommunityInfoSettingPage = () => {
  const headerText = '공동체 정보 및 설정 보기';
  const [communityInfoData, setCommunityInfoData] =
    useState<CommunityInfoType>(defaultCommunityData);
  // api response에 역할이 없어 임의 설정
  const communityRole: CommunityRoleType = 'admin';

  // loading, error 상태 관리
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // fetch api CommunityInfoData
  useEffect(() => {
    const fetchCommunityInfoData = async () => {
      try {
        // 추후 상태 관리 라이브러리 이용하여 loading, error 상태 관리할 예정
        setLoading(true);
        setError(null);
        // 아직 api 연동 전이므로 delay 함수로 1초 후에 mockApiResponse를 받아옴
        await delay(1000);
        const response = mockApiResponse;
        const formattedData: CommunityInfoType = {
          name: response.name,
          memberInfo: `방장 ${response.adminName} • 멤버 ${response.memberCount}명`,
          creationDate: response.creationDate,
          description: response.description,
          imageUrl: response.imageUrl,
        };
        setCommunityInfoData(formattedData);
      } catch {
        setError('Failed to fetch community data');
      } finally {
        setLoading(false);
      }
    };
    fetchCommunityInfoData();
  }, []);

  // loading, error 페이지 렌더링
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <Header text={headerText} headerType='back' />
      <Container>
        <CommunityInfoSection {...communityInfoData} />
        <CommunitySettingSection communityRole={communityRole} />
      </Container>
    </>
  );
};

export default CommunityInfoSettingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.94rem;
  padding: 0.91rem 1.25rem;
  width: 100vw;
  width: 100svw;
`;
