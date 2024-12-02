import type { ServerListItem } from '@src/types/apis/server.d';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getServers } from '@src/apis/server';

const useServer = () => {
  const { data: serverList } = useQuery<ServerListItem[], AxiosError>({
    queryKey: ['getServers'],
    queryFn: () => getServers(),
  });

  return { serverList };
};

export default useServer;
