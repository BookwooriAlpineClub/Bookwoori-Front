import { useQuery } from '@tanstack/react-query';
import {
  getServerMembers,
  getServerOne,
  postServerCode,
} from '@src/apis/server';
import { Server, ServerMembersResponse } from '@src/types/apis/server.d';
import { AxiosError } from 'axios';

const useSideBarData = (serverId: number) => {
  // 서버 정보
  const { data: serverInfo } = useQuery<Omit<Server, 'serverId'>, AxiosError>({
    queryKey: ['getServerOne', serverId],
    queryFn: () => getServerOne(serverId),
  });

  // 서버 멤버 정보
  const { data: memberList } = useQuery<
    ServerMembersResponse, // 원본 데이터 타입
    AxiosError // 에러 타입
  >({
    queryKey: ['getServerMembers', serverId],
    queryFn: () => getServerMembers(serverId),
  });

  // 서버 초대장 코드
  const { data: copyText } = useQuery<string, AxiosError>({
    queryKey: ['postServerCode', serverId],
    queryFn: () => postServerCode(serverId),
    initialData: 'bookWOORI1234',
  });

  return {
    serverInfo,
    memberList,
    copyText,
  };
};

export default useSideBarData;
