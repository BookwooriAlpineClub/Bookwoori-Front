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
  putClimbingReviewEmoji,
  getClimbingReviewEmojis,
  getClimbingReview,
} from '@src/apis/climbing';
import {
  ClimbingRecruitListRes,
  getClimbingChannelMembersRes,
  getClimbingRes,
  getClimbingReviewEmojiRes,
  getClimbingReviewRes,
  patchClimbingChannelReq,
  patchClimbingMemoReq,
  postClimbingChannelReq,
} from '@src/types/apis/climbing';
import { getServerClimbing } from '@src/apis/server';
import { EmojiType } from '@src/constants/constants';

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

export const useGetClimbingReview = (climbingId: number) => {
  const { data: getReviews, isLoading } = useQuery<
    getClimbingReviewRes,
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

export const usePutEmojiOnReview = (climbingId: number, reviewId: number) => {
  const queryClient = useQueryClient();
  const putEmojiMutation = useMutation({
    mutationFn: (emoji: string) =>
      putClimbingReviewEmoji(climbingId, reviewId, emoji),
    onMutate: async (emoji: keyof typeof EmojiType) => {
      await queryClient.cancelQueries({
        queryKey: ['getClimbingReview', climbingId],
      });
      const previousData = queryClient.getQueryData<getClimbingReviewRes>([
        'getClimbingReview',
        climbingId,
      ]);
      if (previousData && 'ClimbingMemberReviewList' in previousData) {
        queryClient.setQueryData<getClimbingReviewRes>(
          ['getClimbingReview', climbingId],
          (oldData) => {
            if (!oldData || !('ClimbingMemberReviewList' in oldData))
              return oldData;
            return {
              ...oldData,
              ClimbingMemberReviewList: oldData.ClimbingMemberReviewList.map(
                (review) => {
                  const emojiItem = review.reviewEmojiList.find(
                    (item) => item.emoji === emoji,
                  );
                  let updatedReviewEmojiList;
                  if (emojiItem) {
                    if (emojiItem.emojiCount === 1) {
                      updatedReviewEmojiList = review.reviewEmojiList.filter(
                        (item) => item.emoji !== emoji,
                      );
                    } else {
                      updatedReviewEmojiList = review.reviewEmojiList.map(
                        (item) =>
                          item.emoji === emoji
                            ? { ...item, emojiCount: item.emojiCount - 1 }
                            : item,
                      );
                    }
                  } else {
                    updatedReviewEmojiList = [
                      ...review.reviewEmojiList,
                      { emoji, emojiCount: 1 },
                    ];
                  }
                  return {
                    ...review,
                    reviewEmojiList: updatedReviewEmojiList,
                  };
                },
              ),
            };
          },
        );
      }
    },
  });
  return { putEmoji: putEmojiMutation };
};
