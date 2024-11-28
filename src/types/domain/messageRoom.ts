export interface MessageRoomListRes {
  messageRooms: MessageRoom[];
}

export interface MessageRoom {
  messageRoomId: number;
  memberId: number;
  nickname: string;
  profileImg: string;
  recentMessage: string;
  recentMessageTime: string;
}

export interface MessageRoomReq {
  memberId: number;
}

export interface MessageRoomRes {
  messageRoomId: number;
  title: string;
  participants: {
    '1': {
      nickname: string;
      profileImg: string | null;
    };
    '2': {
      nickname: string;
      profileImg: string | null;
    };
  };
  createdAt: string;
}

export interface DMListRes {
  messages: DM[];
}

export interface DM {
  id: string;
  messageRoomId: number;
  memberId: number;
  content: string;
  createdAt: string;
}