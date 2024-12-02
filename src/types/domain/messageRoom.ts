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
    [key: string]: {
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
  reactions?: Reactions;
}

interface Reactions {
  count: number;
}
