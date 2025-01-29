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
  patchShareClimbingReview,
  postClimbingReviewEmoji,
  getClimbingReviewEmojis,
  getClimbingReview,
} from '@src/apis/climbing';
import {
  ClimbingRecruitListRes,
  getClimbingChannelMembersRes,
  getClimbingRes,
  getClimbingReviewEmojiRes,
  getClimbingReviewListRes,
  patchClimbingChannelReq,
  patchClimbingMemoReq,
  postClimbingChannelReq,
} from '@src/types/apis/climbing';
import { getServerClimbing } from '@src/apis/server';
import { EmojiTypeType } from '@src/constants/constants';

export const useGetClimbing = (climbingId: number) => {
  const { data: climbingInfo, isLoading } = useQuery<
    getClimbingRes,
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
  const { data } = useQuery<getClimbingChannelMembersRes, AxiosError>({
    queryKey: ['getClimbingMembers', climbingId],
    queryFn: () => getClimbingMembers(climbingId as number),
  });

  return { participants: data?.climbingMemberList };
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

export const usePatchMemo = () => {
  const editMemo = useMutation({
    mutationKey: ['patchMemo'],
    mutationFn: ({
      climbingId,
      body,
    }: {
      climbingId: number;
      body: patchClimbingMemoReq;
    }) => patchClimbingMemberMemo(climbingId, body),
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

export const usePatchShareReview = () => {
  const shareReview = useMutation({
    mutationKey: ['patchShareClimbingReview'],
    mutationFn: (climbingId: number) => patchShareClimbingReview(climbingId),
  });

  return { shareReview };
};

export const usePostReviewEmoji = () => {
  const postEmoji = useMutation({
    mutationKey: ['postReviewEmoji'],
    mutationFn: ({
      climbingId,
      reviewId,
      emoji,
    }: {
      climbingId: number;
      reviewId: number;
      emoji: EmojiTypeType;
    }) => postClimbingReviewEmoji(climbingId, reviewId, emoji),
  });

  return { postEmoji };
};

export const useGetClimbingReview = (climbingId: number) => {
  const { data: getReviews, isLoading } = useQuery<
    getClimbingReviewListRes,
    AxiosError
  >({
    queryKey: ['getClimbingReview', climbingId],
    queryFn: () => getClimbingReview(climbingId),
  });
  return { getReviews, isLoading };
};

export const useGetReviewEmojis = ({
  climbingId,
  reviewId,
}: {
  climbingId: number;
  reviewId: number;
}) => {
  const getEmojis = useQuery<getClimbingReviewEmojiRes, AxiosError>({
    queryKey: ['getClimbingReviewEmojis', climbingId, reviewId],
    queryFn: () => getClimbingReviewEmojis(climbingId, reviewId),
  });
  return { getEmojis };
};

export const useGetPatchShareClimbingReview = (climbingId: number) => {
  const shareReview = useMutation({
    mutationFn: () => patchShareClimbingReview(climbingId),
    onSuccess: () => {
      console.log('Review shared successfully!');
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error sharing review:', error);
    },
  });
  return { shareReview };
};
