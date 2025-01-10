import React from 'react';
import CommunityInfoSection, {
  CommunityInfoProps,
} from '@src/components/communityinfosetting/CommunityInfoSection';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import CommunitySettingSection from '@src/components/communityinfosetting/CommunitySettingSection';
import { useQuery } from '@tanstack/react-query';
import { Server } from '@src/types/apis/server.d';
import { AxiosError } from 'axios';
import { getServerOne } from '@src/apis/server';
import useLoaderData from '@src/hooks/useRoaderData';

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
  // const { serverId: id } = useParams<{ serverId: string }>();
  const { id: serverId } = useLoaderData<{ id: number }>();
  if (!serverId)
    throw new Error('CommunityInfoSettingPage: serverId is not provided');
  // const serverId = parseInt(id, 10);
  const { data, error, isLoading } = useQuery<
    Omit<Server, 'serverId'>,
    AxiosError
  >({
    queryKey: ['getServerOne', serverId],
    queryFn: () => getServerOne(serverId),
    enabled: !!serverId,
  });

  const mapServerToCommunityInfo = (
    server: Omit<Server, 'serverId'>,
  ): CommunityInfoProps => ({
    name: server.name,
    memberInfo: `방장 ${server.ownerNickname} · 멤버 ${server.memberCount}명`,
    creationDate: server.createdAt,
    description: server.description,
    serverImg: server.serverImg || '',
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error: 데이터를 불러오지 못했습니다.</div>;
  }

  const communityInfo = mapServerToCommunityInfo(data);

  return (
    <>
      <Header text={headerText} headerType='back' />
      <Container>
        <CommunityInfoSection {...communityInfo} />
        <CommunitySettingSection isOwner={data?.isOwner} />
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
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
