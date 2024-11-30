import { getServerChannels } from '@src/apis/server';
import { CategoriesRes } from '@src/types/domain/category';
import { Categories } from '@src/types/domain/channel';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useCategory = (serverId: number) => {
  const { data: categoryList } = useQuery<
    CategoriesRes,
    AxiosError,
    Pick<Categories, 'categoryId' | 'name'>[]
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
