import { getServerChannels } from '@src/apis/server';
import type { CategoryRes } from '@src/types/apis/category';
import type { Category } from '@src/types/category';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useCategory = (serverId: number) => {
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

export default useCategory;
