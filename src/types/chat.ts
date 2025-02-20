export type Payload =
  | ({ messageRoomId: number } & BasePayload)
  | ({ channelId: number } & BasePayload);

export interface BasePayload {
  parentMemberId?: number;
  parentId?: string;
  parentContent?: string;
  id: string;
  memberId: number;
  content: string;
  createdAt: string;
  reactions?: Reactions;
}

export interface Reactions {
  [reactionName: string]: ReactionDetail;
}

interface ReactionDetail {
  count: number;
  members: number[];
}

interface ReactionDetail {
  count: number;
  members: number[];
}

// 상수 파일 추가 후 삭제 필요
export const EmojiType = {
  GOOD: 'good',
  HEART: 'heart',
  SMILE: 'smile',
  CRY: 'cry',
  THINK: 'think',
} as const;

export type EmojiTypeType = (typeof EmojiType)[keyof typeof EmojiType];
