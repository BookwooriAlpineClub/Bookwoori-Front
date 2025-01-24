import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';
import {
  deleteClimbing,
  getClimbing,
  patchClimbing,
  putParticipate,
  getClimbingMembers,
  patchClimbingMemberMemo,
  postClimbing,
} from '@src/apis/climbing';
import {
  ClimbingRecruitListRes,
  getClimbingChannelMembersRes,
  getClimbingInfoRes,
  patchClimbingChannelReq,
  patchClimbingMemoReq,
  postClimbingChannelReq,
} from '@src/types/apis/climbing';
import { getServerClimbing } from '@src/apis/server';

export const useGetClimbing = (climbingId: number) => {
  const { data: climbingInfo, isLoading } = useQuery<
    getClimbingInfoRes,
    AxiosError
  >({
    queryKey: ['getClimbing', climbingId],
    queryFn: () => getClimbing(climbingId as number),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return { climbingInfo, isLoading };
};

export const useGetClimbingMembers = (climbingId: number) => {
  const { data: participants } = useQuery<
    getClimbingChannelMembersRes,
    AxiosError
  >({
    queryKey: ['getClimbingMembers', climbingId],
    queryFn: () => getClimbingMembers(climbingId as number),
  });

  return { participants };
};

export const useGetClimbingRecruitList = () => {
  const serverId = useRecoilValue(currentServerIdState);

  const { data } = useQuery<ClimbingRecruitListRes, AxiosError>({
    queryKey: ['getClimbingRecruitList', serverId],
    queryFn: () =>
      getServerClimbing(
        serverId,
        { 'Content-Type': 'application/json' },
        '/ready',
      ),
  });

  return { data: data?.readyClimbingList };
};

export const usePutParticipate = (climbingId: number) => {
  const serverId = useRecoilValue(currentServerIdState);
  const queryClient = useQueryClient();

  const participateClimbing = useMutation({
    mutationKey: ['putParticipate'],
    mutationFn: () => putParticipate(climbingId as number),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['getClimbingRecruitList', serverId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['getServerClimbing'],
        }),
      ]);
    },
  });

  return { participateClimbing };
};

export const usePatchClimbing = () => {
  const serverId = useRecoilValue(currentServerIdState);
  const queryClient = useQueryClient();

  const editClimbing = useMutation({
    mutationKey: ['patchClimbing'],
    mutationFn: ({
      climbingId,
      body,
    }: {
      climbingId: number;
      body: patchClimbingChannelReq;
    }) => patchClimbing(climbingId as number, body),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['getClimbingRecruitList', serverId],
      }),
  });

  return { editClimbing };
};

export const usePatchMemo = (climbingId: number) => {
  const editMemo = useMutation({
    mutationKey: ['patchMemo'],
    mutationFn: (body: patchClimbingMemoReq) =>
      patchClimbingMemberMemo(climbingId, body),
  });

  return {
    editMemo,
  };
};

export const usePostClimbing = () => {
  const createClimbing = useMutation({
    mutationFn: (body: postClimbingChannelReq) => postClimbing(body),
  });

  return { createClimbing };
};

export const useDeleteClimbing = () => {
  const serverId = useRecoilValue(currentServerIdState);
  const queryClient = useQueryClient();

  const delClimbing = useMutation({
    mutationKey: ['deleteClimbing'],
    mutationFn: (climbingId: number) => deleteClimbing(climbingId),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['getClimbingRecruitList', serverId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['getServerClimbing'],
        }),
      ]);
    },
  });

  return { delClimbing };
};
