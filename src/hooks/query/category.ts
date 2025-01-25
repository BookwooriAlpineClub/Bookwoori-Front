import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';
import { getServerChannels } from '@src/apis/server';
import type { CategoryRes } from '@src/types/apis/category';
import type { Category } from '@src/types/category';


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
  });

  return {
    categoryList,
  };
};
