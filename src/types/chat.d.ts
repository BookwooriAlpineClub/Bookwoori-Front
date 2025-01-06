interface BaseEvent {
  eventType: 'NEW_MESSAGE' | 'REACT' | 'REPLY';
  messageRoomId?: number;
  channelId?: number;
}

export interface Payload {
  messageRoomId?: number;
  channelId?: number;
  id: string;
  memberId: number;
  content: string;
  createdAt: string;
  type?: 'TEXT' | 'IMAGE';
}

interface NewMessageEvent extends BaseEvent {
  eventType: 'NEW_MESSAGE';
  payload: Payload;
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
  payload: Payload & {
    parentId: string;
    parentContent: string;
  };
}

export type ChatEvent = NewMessageEvent | ReactEvent | ReplyEvent;

// 상수 파일 추가 후 삭제 필요
export const EmojiType = {
  GOOD: 'good',
  HEART: 'heart',
  SMILE: 'smile',
  CRY: 'cry',
  THINK: 'think',
} as const;

export type EmojiTypeType = (typeof EmojiType)[keyof typeof EmojiType];

interface ReactionDetail {
  count: number;
  members: number[];
}

export type Reactions = Partial<Record<EmojiTypeType, ReactionDetail>>;
