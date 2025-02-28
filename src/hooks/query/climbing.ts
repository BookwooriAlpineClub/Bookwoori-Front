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
  GetClimbingChannelMembersRes,
  GetClimbingRes,
  GetClimbingReviewEmojiRes,
  GetClimbingReviewRes,
  PatchClimbingChannelReq,
  PatchClimbingMemoReq,
  PostClimbingChannelReq,
} from '@src/types/apis/climbing';
import { getServerClimbing } from '@src/apis/server';
import { EmojiType } from '@src/constants/constants';

export const useGetClimbing = (climbingId: number) => {
  const { data: climbingInfo, isLoading } = useQuery<
    GetClimbingRes,
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
  const { data } = useQuery<GetClimbingChannelMembersRes, AxiosError>({
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
    enabled: serverId !== -1,
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
      body: PatchClimbingChannelReq;
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
      body: PatchClimbingMemoReq;
    }) => patchClimbingMemberMemo(climbingId, body),
  });

  return {
    editMemo,
  };
};

export const usePostClimbing = () => {
  const createClimbing = useMutation({
    mutationFn: (body: PostClimbingChannelReq) => postClimbing(body),
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

export const useGetClimbingReview = (climbingId: number) => {
  const { data: getReviews, isLoading } = useQuery<
    GetClimbingReviewRes,
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
  const getEmojis = useQuery<GetClimbingReviewEmojiRes, AxiosError>({
    queryKey: ['getClimbingReviewEmojis', climbingId, reviewId],
    queryFn: () => getClimbingReviewEmojis(climbingId, reviewId),
  });
  return { getEmojis };
};

export const useGetPatchShareClimbingReview = (climbingId: number) => {
  const shareReview = useMutation({
    mutationFn: (reviewId: number) =>
      patchShareClimbingReview(climbingId, reviewId),
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
      const previousData = queryClient.getQueryData<GetClimbingReviewRes>([
        'getClimbingReview',
        climbingId,
      ]);
      if (previousData && 'ClimbingMemberReviewList' in previousData) {
        queryClient.setQueryData<GetClimbingReviewRes>(
          ['getClimbingReview', climbingId],
          (oldData) => {
            if (!oldData || !('ClimbingMemberReviewList' in oldData))
              return oldData;
            return {
              ...oldData,
              ClimbingMemberReviewList: oldData.ClimbingMemberReviewList.map(
                (review) => {
                  // 대상 reviewId에 해당하는 리뷰만 업데이트
                  if (review.reviewId !== reviewId) return review;

                  // 기존 reviewEmojiList에서 해당 이모지가 있는지 확인
                  const emojiItem = review.reviewEmojiList.find(
                    (item) => item.emoji === emoji,
                  );
                  let updatedReviewEmojiList;

                  if (emojiItem) {
                    // 이미 이모지가 존재하는 경우, 사용자의 클릭 상태에 따라 분기 처리
                    if (emojiItem.isClicked) {
                      // 이미 클릭한 상태라면 해제(토글 OFF)
                      if (emojiItem.emojiCount === 1) {
                        // count가 1이면 해당 이모지를 리스트에서 제거
                        updatedReviewEmojiList = review.reviewEmojiList.filter(
                          (item) => item.emoji !== emoji,
                        );
                      } else {
                        // 그 외에는 count를 줄이고, isClicked는 false로 업데이트
                        updatedReviewEmojiList = review.reviewEmojiList.map(
                          (item) =>
                            item.emoji === emoji
                              ? {
                                  ...item,
                                  emojiCount: item.emojiCount - 1,
                                  isClicked: false,
                                }
                              : item,
                        );
                      }
                    } else {
                      // 아직 클릭하지 않은 상태라면 추가
                      updatedReviewEmojiList = review.reviewEmojiList.map(
                        (item) =>
                          item.emoji === emoji
                            ? {
                                ...item,
                                emojiCount: item.emojiCount + 1,
                                isClicked: true,
                              }
                            : item,
                      );
                    }
                  } else {
                    // 기존 리스트에 해당 이모지가 없다면 새로 추가
                    updatedReviewEmojiList = [
                      ...review.reviewEmojiList,
                      { emoji, emojiCount: 1, isClicked: true },
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
