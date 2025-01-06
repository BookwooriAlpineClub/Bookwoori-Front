export interface MessageRequest {
  messageRoomId?: number;
  channelId?: number;
  type: 'text' | 'image';
  content: string;
}

export interface ReactionRequest {
  id: string;
  emoji:
    | 'thumps_up'
    | 'heart_hands'
    | 'smiling_face'
    | 'crying_face'
    | 'thinking_face';
  action: 'add' | 'remove';
}

export interface ReplyRequest extends MessageRequest {
  parentId: string;
}
