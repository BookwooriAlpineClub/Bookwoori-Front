import { authClient } from '@src/apis/index';
import {
  DMListRes,
  MessageRoomListRes,
  MessageRoomReq,
  MessageRoomRes,
} from '@src/types/domain/messageRoom';

export const getMessageRoomList = async <
  Res = MessageRoomListRes,
>(): Promise<Res> => {
  const response = await authClient.get(`/messageRooms/me`);
  return response.data;
};

export const postMessageRoom = async <
  Res = MessageRoomRes,
  Req = MessageRoomReq,
>(
  body: Req,
): Promise<Res> => {
  const response = await authClient.post(`messageRooms`, body);
  return response.data;
};

export const getDmList = async <Res = DMListRes>(): Promise<Res> => {
  const response = await authClient.get(`directMessages`);
  return response.data;
};
