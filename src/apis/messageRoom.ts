import { authClient } from '@src/apis/index';
import {
  DMListRes,
  MessageRoomListRes,
  MessageRoomReq,
  MessageRoomRes,
} from '@src/types/domain/messageRoom';

/* 채팅방 목록 조회 */
export const getMessageRoomList = async <Res = MessageRoomListRes>(
  page?: number,
  size?: number,
): Promise<Res> => {
  const queryParams = new URLSearchParams();

  if (page) {
    queryParams.append('page', String(page));
  }

  if (size) {
    queryParams.append('size', String(size));
  }

  const url = `/messageRooms/me${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await authClient.get(url);
  return response.data;
};

/* dm 생성 */
export const postMessageRoom = async <
  Res = MessageRoomRes,
  Req = MessageRoomReq,
>(
  body: Req,
): Promise<Res> => {
  const response = await authClient.post(`messageRooms`, body);
  return response.data;
};

/* 채팅 목록 조회 */
export const getDmList = async <Res = DMListRes>(
  messageRoomId: number,
  page?: number,
  size?: number,
): Promise<Res> => {
  const queryParams = new URLSearchParams({
    messageRoomId: String(messageRoomId),
  });

  if (page) {
    queryParams.append('page', String(page));
  }

  if (size) {
    queryParams.append('size', String(size));
  }

  const response = await authClient.get(
    `directMessages?${queryParams.toString()}`,
  );
  return response.data;
};
