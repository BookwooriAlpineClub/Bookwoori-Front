import { getMessageRoomList } from '@src/apis/messageRoom';
import { useQuery } from '@tanstack/react-query';

const useDm = () => {
  const { data } = useQuery({
    queryKey: ['getMessageRoomList'],
    queryFn: () => getMessageRoomList(),
  });

  return { data: data?.messageRooms };
};

export default useDm;
