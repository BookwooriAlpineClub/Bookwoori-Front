declare type MessageRequest = {
  messageRoomId: number;
  type: 'text' | 'image';
  content: string;
};

declare type ReactionRequest = {
  id: string;
  emoji:
    | 'thumps_up'
    | 'heart_hands'
    | 'smiling_face'
    | 'crying_face'
    | 'thinking_face';
  action: 'add' | 'remove';
};

declare type ReplyRequest = MessageRequest & {
  parentId: string;
};
