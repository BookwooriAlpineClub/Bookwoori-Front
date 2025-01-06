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
