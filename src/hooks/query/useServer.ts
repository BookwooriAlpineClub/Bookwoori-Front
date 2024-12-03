import type { ServerListItem } from '@src/types/apis/server.d';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getServers } from '@src/apis/server';

const useServer = () => {
  const {
    data: { servers: serverList },
  } = useQuery<{ servers: ServerListItem[] }, AxiosError>({
    queryKey: ['getServers'],
    queryFn: () => getServers(),
    initialData: { servers: [] },
  });

  return { serverList };
};

export default useServer;
