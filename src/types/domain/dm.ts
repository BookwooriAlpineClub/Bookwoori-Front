interface BaseEvent {
  eventType: 'NEW_MESSAGE' | 'REACT' | 'REPLY';
  messageRoomId?: number;
  channelId?: number;
}

interface NewMessageEvent extends BaseEvent {
  eventType: 'NEW_MESSAGE';
  payload: {
    id: string;
    messageRoomId?: number;
    channelId?: number;
    memberId: number;
    type: 'TEXT' | 'IMAGE';
    content: string;
    createdAt: string;
  };
}

interface ReactEvent extends BaseEvent {
  eventType: 'REACT';
  payload: {
    id: string;
    emoji: string;
    emojiCount: number;
    members: number[];
  };
}

interface ReplyEvent extends BaseEvent {
  eventType: 'REPLY';
  payload: {
    id: string;
    messageRoomId: number;
    memberId: number;
    type: 'TEXT' | 'IMAGE';
    content: string;
    createdAt: string;
    parentId: string;
    parentContent: string;
  };
}

export type ChatEvent = NewMessageEvent | ReactEvent | ReplyEvent;
