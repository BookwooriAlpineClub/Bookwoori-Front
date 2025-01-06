import { MessageRoom, DM } from '@src/types/messageRoom';

export interface MessageRoomListResponse {
  messageRooms: MessageRoom[];
}

export interface MessageRoomResponse {
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

export interface MessageRoomRequest {
  memberId: number;
}

export interface DMListResponse {
  messages: DM[];
}