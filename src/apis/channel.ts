import type { AxiosResponse } from 'axios';
import type { Channel } from '@src/types/apis/channel.d';
import { authClient } from '@src/apis/index';

/** 채널 생성 */
export const postChannel = async <Res = void, Req = Channel>(
  body: Req,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>, Req>(
    `/channels`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};

/** 채널 수정 */
// 백엔드에 수정 요청함
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

/** 채널 삭제 */
export const deleteChannel = async <Res = void>(
  channelId: number,
): Promise<Res> => {
  const response = await authClient.delete<Res>(`/channels/${channelId}`);
  return response.data;
};
