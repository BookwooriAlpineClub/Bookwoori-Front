import { MessageRoom, DM } from '@src/types/messageRoom';

export interface MessageRoomListRes {
  messageRooms: MessageRoom[];
}

export interface MessageRoomRes {
  messageRoomId: number;
  title: string;
  participants: {
    [key: string]: {
      nickname: string;
      profileImg: string | null;
    };
  };
  createdAt: string;
}

export interface MessageRoomReq {
  memberId: number;
}

export interface DMListRes {
  messages: DM[];
}