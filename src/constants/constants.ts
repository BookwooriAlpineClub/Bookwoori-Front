/* 독서 상태 */
export const ReadingStatus = {
  WISH: 'WISH',
  READING: 'READING',
  FINISHED: 'FINISHED',
} as const;

export type ReadingStatusType =
  (typeof ReadingStatus)[keyof typeof ReadingStatus];

/* 클라이밍 상태 */
export const ClimbingStatus = {
  READY: 'READY',
  RUNNING: 'RUNNING',
  FINISHED: 'FINISHED',
  FAILED: 'FAILED',
} as const;

export type ClimbingStatusType =
  (typeof ClimbingStatus)[keyof typeof ClimbingStatus];

/* 채널 유형 */
export const ChannelType = {
  CHAT: 'CHAT',
  VOICE: 'VOICE',
} as const;

export type ChannelTypeType = (typeof ChannelType)[keyof typeof ChannelType];

/* 알림 유형 */
export const NotificationType = {
  CHAT: 'CHAT',
  MENTION: 'MENTION',
} as const;

export type NotificationTypeType =
  (typeof NotificationType)[keyof typeof NotificationType];

/* 이모지 유형 */
export const EmojiType = {
  GOOD: '👍',
  HEART: '❤️',
  SMILE: '😊',
  CRY: '😢',
  THINK: '🤔',
} as const;

export type EmojiTypeType = (typeof EmojiType)[keyof typeof EmojiType];

/* 서버 역할 */
export const RoleType = {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER',
} as const;

export type RoleTypeType = (typeof RoleType)[keyof typeof RoleType];
