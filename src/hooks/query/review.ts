import type { AxiosError } from 'axios';
import type Review from '@src/types/review';
import type {
  GetReviewListRes,
  PostReviewReq,
  PatchReviewReq,
} from '@src/types/apis/review';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getReviewList,
  postReview,
  patchReview,
  deleteReview,
} from '@src/apis/review';

const useGetReviewList = () => {
  return useQuery<GetReviewListRes, AxiosError>({
    queryKey: ['getReviewList'],
    queryFn: () => getReviewList(),
    initialData: [],
  });
};
const usePostReview = () => {
  return useMutation({
    mutationFn: ({ body }: { body: PostReviewReq }) => postReview(body),
  });
};
const usePatchReview = (reviewId: Review['reviewId']) => {
  return useMutation({
    mutationFn: ({ body }: { body: PatchReviewReq }) =>
      patchReview(reviewId, body),
  });
};
const useDeleteReview = (reviewId: Review['reviewId']) => {
  return useMutation({
    mutationFn: () => deleteReview(reviewId),
  });
};

export { useGetReviewList, usePostReview, usePatchReview, useDeleteReview };
