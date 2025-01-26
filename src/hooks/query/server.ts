import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { PostServerReq } from '@src/types/apis/server';
import useToast from '@src/hooks/useToast';
import { encodeId } from '@src/utils/formatters';
import { ROUTE_PATH } from '@src/constants/routePath';
import {
  getServerByCode,
  getServerOne,
  postServer,
  postServerJoinByCode,
} from '@src/apis/server';

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

/* 초대 코드로 서버 확인 */
export const useGetServerByCode = (inviteCode: string) => {
  return useQuery({
    queryKey: ['getServerByCode', inviteCode],
    queryFn: () => getServerByCode(inviteCode),
  });
};

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

/* 서버 정보 조회 */
export const useGetServerOne = (serverId: number) => {
  return useQuery({
    queryKey: ['getServerOne', serverId],
    queryFn: () => getServerOne(serverId),
  });
};
