import type { AxiosResponse } from 'axios';
import type { Channel } from '@src/types/apis/channel.d';
import { authClient } from '@src/apis/index';
import { ChannelMessagesRes } from '@src/types/domain/channel';

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

/**
 * 채널 편집
 * @ 백엔드에 수정 요청함
 */
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

/**
 * 채널 삭제
 * @ 백엔드 구현 미완료
 */
export const deleteChannel = async <Res = void>(
  channelId: number,
): Promise<Res> => {
  const response = await authClient.delete<Res>(`/channels/${channelId}`);
  return response.data;
};

/**
 * 채널 채팅 내역 조회
 * @ 백엔드 구현 미완료
 */
export const getChannelMessages = async <Res = ChannelMessagesRes>(
  channelId: number,
  page?: number,
  size?: number,
): Promise<Res> => {
  const queryParams = new URLSearchParams({
    channelId: String(channelId),
  });

  if (page !== undefined) {
    queryParams.append('page', String(page));
  }

  if (size !== undefined) {
    queryParams.append('size', String(size));
  }

  const response = await authClient.get(
    `/channelMessages?${queryParams.toString()}`,
  );
  return response.data;
};
