import type { AxiosError } from 'axios';
import type { GetServersRes } from '@src/types/apis/server';
import { useQuery } from '@tanstack/react-query';
import { getServers } from '@src/apis/server';

const useGetServerList = () => {
  return useQuery<GetServersRes, AxiosError>({
    queryKey: ['getServers'],
    queryFn: () => getServers(),
    initialData: { servers: [] },
  });
};

export { useGetServerList };
