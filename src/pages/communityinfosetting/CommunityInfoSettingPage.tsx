import CommunityInfoSection from '@src/components/community/CommunityInfoSection';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import CommunitySettingSection from '@src/components/community/CommunitySettingSection';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetServerOne } from '@src/hooks/query/server';
import Spinner from '@src/components/common/Spinner';

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

  if (isLoading) {
    return <Spinner />;
  }
  if (!server) {
    return <div>Not Found</div>;
  }

  const communityInfo = {
    name: server.name,
    memberInfo: `방장 ${server.ownerNickname} · 멤버 ${server.memberCount}명`,
    creationDate: server.createdAt,
    description: server.description,
    serverImg: server.serverImg || '',
  };

  return (
    <>
      <Header text={headerText} headerType='back' />
      <Main>
        <CommunityInfoSection {...communityInfo} />
        <CommunitySettingSection isOwner={server.isOwner} />
      </Main>
    </>
  );
};

export default CommunityInfoSettingPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0.94rem;
  padding: 0.91rem 1.25rem;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
