import type { Payload } from '@src/types/chat';

export interface MessageReq {
  messageRoomId?: number;
  channelId?: number;
  type: 'text' | 'image';
  content: string;
}

export interface ReactionReq {
  id: string;
  emoji:
    | 'thumps_up'
    | 'heart_hands'
    | 'smiling_face'
    | 'crying_face'
    | 'thinking_face';
  action: 'add' | 'remove';
}

export interface ReplyReq extends MessageReq {
  parentId: string;
}

export interface DeleteReq {
  id: string;
}

export interface EditReq {
  id: string;
  content: string;
}

export type ChatEventRes =
  | NewMessageEvent
  | ReactEvent
  | ReplyEvent
  | ModifyEvent
  | DeleteEvent;

interface NewMessageEvent extends BaseEvent {
  eventType: 'NEW_MESSAGE';
  payload: Payload & {
    type: 'TEXT' | 'IMAGE';
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
  payload: Payload & {
    parentId: string;
    parentContent: string;
    type: 'TEXT' | 'IMAGE';
  };
}

interface ModifyEvent extends BaseEvent {
  eventType: 'MODIFY';
  payload: Payload & {
    modifiedAt: 'string';
  };
}

interface DeleteEvent extends BaseEvent {
  eventType: 'DELETE';
  payload: Pick<Payload, 'id'>;
}

interface BaseEvent {
  eventType: 'NEW_MESSAGE' | 'REACT' | 'REPLY' | 'MODIFY' | 'DELETE';
  messageRoomId?: number;
  channelId?: number;
}
