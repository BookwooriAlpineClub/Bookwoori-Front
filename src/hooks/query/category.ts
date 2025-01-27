import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';
import type { CategoryMoveReq, CategoryRes } from '@src/types/apis/category';
import type { Category } from '@src/types/category';
import { patchCategoryMove } from '@src/apis/category';
import { getServerChannels } from '@src/apis/server';

export const useCategory = () => {
  const serverId = useRecoilValue(currentServerIdState);

  const { data: categoryList } = useQuery<
    CategoryRes,
    AxiosError,
    Pick<Category, 'categoryId' | 'name'>[]
  >({
    queryKey: ['getServerChannels', serverId],
    queryFn: () => getServerChannels(serverId),
    select: (rawData) =>
      rawData?.categories?.map((it) => ({
        categoryId: it.categoryId,
        name: it.name,
      })) || [],
    enabled: serverId !== -1,
  });

  return {
    categoryList,
  };
};

export const usePatchCategoryLocation = () => {
  const queryClient = useQueryClient();
  const serverId = useRecoilValue(currentServerIdState);

  const editLocation = useMutation({
    mutationFn: ({
      categoryId,
      body,
    }: {
      categoryId: number;
      body: CategoryMoveReq;
    }) => patchCategoryMove(categoryId, body),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['getServerChannels', serverId],
      });

      const prevData = queryClient.getQueryData([
        'getServerChannels',
        serverId,
      ]);

      return { prevData };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(
        ['getServerChannels', serverId],
        context?.prevData,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['getServerChannels', serverId],
      });
    },
  });

  return { editLocation };
};
