import type { AxiosResponse } from 'axios';
import { authClient } from '@src/apis/index';
import { Channel } from '@src/types/apis/channel.d';

export const patchChannel = async <
  Res = void,
  Req = Pick<Channel, 'categoryId' | 'name'>,
>(
  channelId: number,
  body: Req,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>, Req>(
    `/channels/${channelId}`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};

export const deleteChannel = async <Res = void>(
  channelId: number,
): Promise<Res> => {
  const response = await authClient.delete<Res>(`/channels/${channelId}`);
  return response.data;
};