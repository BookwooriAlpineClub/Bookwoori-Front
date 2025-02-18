import CommunityInfoSection from '@src/components/community/CommunityInfoSection';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import CommunitySettingSection from '@src/components/community/CommunitySettingSection';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetServerOne } from '@src/hooks/query/server';
import { useState } from 'react';
import LoadingPage from '@src/pages/fallback/LoadingPage';

export interface CommunityInfoType {
  name: string;
  memberInfo: string; // 방장 이름 + 멤버 수
  creationDate: string;
  description: string;
  imageUrl: string;
}

export type CommunityRoleType = 'admin' | 'user';

const CommunityInfoSettingPage = () => {
  const headerText = '공동체 정보 및 설정 보기';
  const { id: serverId } = useLoaderData<{ id: number }>();
  const { data: server, isLoading } = useGetServerOne(serverId);

  const [isSpinning, setIsSpinning] = useState(false);

  if (isLoading || isSpinning) {
    return <LoadingPage />;
  }
  if (!server) {
    return <div>Not Found</div>;
  }

  const communityInfo = {
    name: server.name,
    memberInfo: `방장 ${server.ownerNickname} · 멤버 ${server.memberCount}명`,
    creationDate: server.createdAt,
    description: server.description,
    serverImg: server.serverImg || null,
  };

  return (
    <>
      <Header text={headerText} headerType='back' />
      <Main>
        <CommunityInfoSection {...communityInfo} />
        <CommunitySettingSection
          isOwner={server.isOwner}
          setIsSpinning={setIsSpinning}
        />
      </Main>
    </>
  );
};

export default CommunityInfoSettingPage;

const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
