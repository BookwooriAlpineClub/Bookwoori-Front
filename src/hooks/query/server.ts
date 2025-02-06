import type { AxiosError } from 'axios';
import type { PostServerReq, GetServersRes } from '@src/types/apis/server';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import useToast from '@src/hooks/useToast';
import { encodeId } from '@src/utils/formatters';
import { ROUTE_PATH } from '@src/constants/routePath';
import {
  getServerByCode,
  getServerOne,
  postServer,
  postServerJoinByCode,
  getServers,
  getServerMembers,
  postServerInvitationCode,
  deleteServerMember,
  patchServerMemberOwner,
  deleteServer,
} from '@src/apis/server';

export const useGetServerList = (isOpen: boolean) => {
  return useQuery<GetServersRes, AxiosError, GetServersRes['servers']>({
    queryKey: ['getServers'],
    queryFn: () => getServers(),
    select: (rawData) => rawData?.servers,
    initialData: { servers: [] },
    enabled: isOpen,
  });
};

/* 초대 코드로 서버 확인 */
export const useGetServerByCode = (inviteCode: string) => {
  return useQuery({
    queryKey: ['getServerByCode', inviteCode],
    queryFn: () => getServerByCode(inviteCode),
  });
};

/* 서버 정보 조회 */
export const useGetServerOne = (serverId: number) => {
  return useQuery({
    queryKey: ['getServerOne', serverId],
    queryFn: () => getServerOne(serverId),
    enabled: serverId !== -1,
  });
};

/* 서버 생성 */
export const usePostServer = (resetFields: () => void) => {
  const navigate = useNavigate();
  const addToast = useToast();

  const mutation = useMutation({
    mutationFn: (data: PostServerReq) => postServer(data),
    onSuccess: (res) => {
      addToast('success', '공동체가 생성되었습니다.');
      resetFields();
      const encodedId = encodeId(res.serverId);
      navigate(ROUTE_PATH.server.replace(':serverId', encodedId));
    },
  });
  return mutation;
};

/* 초대 코드로 서버 가입 */
export const usePostServerJoin = (inviteCode: string) => {
  const navigate = useNavigate();
  const addToast = useToast();
  const mutation = useMutation({
    mutationFn: () => postServerJoinByCode(inviteCode),
    onSuccess: (res) => {
      addToast('success', '가입 완료');
      const { serverId } = res;
      const path = ROUTE_PATH.server.replace(
        ':serverId',
        encodeId(serverId || -1),
      );
      navigate(path);
    },
  });
  return mutation;
};

/* 서버 멤버 목록 조회 */
export const useGetServerMembers = (serverId: number, isOpen: boolean) => {
  return useQuery({
    queryKey: ['getServerMembers', serverId],
    queryFn: () => getServerMembers(serverId),
    select: (rawData) => rawData.members,
    enabled: isOpen,
  });
};

/* 서버 초대코드 복사 */
export const usePostServerInviteCode = (serverId: number) => {
  const mutation = useMutation({
    mutationFn: () => postServerInvitationCode(serverId),
  });
  return mutation;
};

/* 서버 나가기 */
export const useDeleteServerMember = (serverId: number) => {
  const mutation = useMutation({
    mutationFn: () => deleteServerMember(serverId),
  });
  return mutation;
};

/* 서버 권한 위임 */
export const usePatchServerMemberOwner = (serverId: number) => {
  const mutation = useMutation({
    mutationFn: (memberId: number) =>
      patchServerMemberOwner(serverId, { memberId }),
  });
  return mutation;
};

/* 서버 삭제 */
export const useDeleteServer = (serverId: number) => {
  const mutation = useMutation({
    mutationFn: () => deleteServer(serverId),
  });
  return mutation;
};
