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

/* 클라이밍 참여자 독서 상태 */
export const ClimbingReadingStatus = {
  UNREAD: 'UNREAD',
  READING: 'READING',
  FINISHED: 'FINISHED',
} as const;

export type ClimbingReadingStatusType =
  (typeof ClimbingReadingStatus)[keyof typeof ClimbingReadingStatus];

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
  GOOD: { key: 'GOOD', value: '👍' },
  HEART: { key: 'HEART', value: '❤️' },
  SMILE: { key: 'SMILE', value: '😊' },
  CRY: { key: 'CRY', value: '😢' },
  THINK: { key: 'THINK', value: '🤔' },
} as const;

export type EmojiTypeType = (typeof EmojiType)[keyof typeof EmojiType];


/* Exp 유형 */
export const ExpType = {
  READ_PAGE: '읽은 쪽수를 기록했어요.',
  ADD_STAR: '별점을 작성했어요.',
  WRITE_REVIEW: '감상평을 작성했어요.',
  FINISHED_CLIMBING: '등반을 성공했어요.',
};

export type ExpTypeType = keyof typeof ExpType;

/* 서버 역할 */
export const RoleType = {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER',
} as const;

export type RoleTypeType = (typeof RoleType)[keyof typeof RoleType];

/* 커스텀 에러 코드 */
export const ErrorCode = {
  CLIENT: {
    BAD_REQUEST: 1000,
    MISSING_PARAMETER: 1001,
    INVALID_ENUM_VALUE: 1002,
  },
  FILE: {
    INVALID_FILE_FORMAT: 1500,
    UNSUPPORTED_FILE_FORMAT: 1501,
    FILE_UPLOAD_FAIL: 1502,
    FILE_COMPARISON_FAIL: 1503,
  },
  AUTH: {
    UNAUTHORIZED: 2000,
    ACCESS_DENIED: 2001,
    INVALID_JWT_SIGNATURE: 2003,
    INVALID_TOKEN: 2100,
    NO_COOKIE: 2101,
    EXPIRED_ACCESS_TOKEN: 2300,
    EXPIRED_REFRESH_TOKEN: 2301,
  },
  RESOURCE: {
    /* MEMBER */
    MEMBER_NOT_FOUND: 3000,
    MEMBER_INACTIVE: 3001,
    /* SERVER */
    SERVER_NOT_FOUND: 3100,
    ALREADY_JOINED_SERVER: 3101,
    DELEGATION_REQUIRED: 3102,
    SERVER_MEMBER_NOT_FOUND: 3150,
    SERVER_OWNER_NOT_FOUND: 3151,
    INVALID_INVITE_CODE: 3190,
    /* CATEGORY */
    CATEGORY_NOT_FOUND: 3200,
    CATEGORY_LOCATE_EXCEPTION: 3201,
    DEFAULT_CATEGORY_EXCEPTION: 3250,
    /* CHANNEL */
    CHANNEL_NOT_FOUND: 3300,
    /* CLIMBING */
    CLIMBING_NOT_FOUND: 3400,
    ALREADY_JOINED_CLIMBING: 3401,
    CLIMBING_NOT_READY: 3402,
    OWNER_CANNOT_LEAVE: 3403,
    CLIMBING_MEMBER_NOT_FOUND: 3404,
    CLIMBING_NOT_RUNNING: 3405,
    /* BOOK */
    BOOK_NOT_FOUND: 3500,
    ALADIN_API_EXCEPTION: 3501,
    /* RECORD */
    RECORD_NOT_FOUND: 3600,
    RECORD_NOT_FINISHED: 3601,
    ALREADY_EXIST_RECORD: 3602,
    /* REVIEW */
    REVIEW_NOT_FOUND: 3700,
    REVIEW_ALREADY_SHARED: 3701,
    REVIEW_EMOJI_NOT_FOUND: 3702,
    ALREADY_EXIST_REVIEW: 3703,
    /* MESSAGE ROOM */
    MESSAGE_ROOM_NOT_FOUND: 3800,
  },
  CHATTING: {
    DIRECT_MESSAGE_NOT_FOUND: 5000,
    CHANNEL_MESSAGE_NOT_FOUND: 5001,
  },
} as const;

type ExtractErrorCodes<T> =
  T extends Record<string, infer U>
    ? U extends Record<string, number>
      ? U[keyof U]
      : never
    : never;

export type ErrorCodeType = ExtractErrorCodes<typeof ErrorCode>;

export const ERROR_MESSAGES = {
  [ErrorCode.CLIENT.BAD_REQUEST]: '요청의 형식이나 내용이 잘못되었습니다.',
  [ErrorCode.CLIENT.MISSING_PARAMETER]: '필수 파라미터가 누락되었습니다.',
  [ErrorCode.CLIENT.INVALID_ENUM_VALUE]: '잘못된 ENUM 값입니다.',

  [ErrorCode.FILE.INVALID_FILE_FORMAT]: '잘못된 파일 형식입니다.',
  [ErrorCode.FILE.UNSUPPORTED_FILE_FORMAT]: '지원하지 않는 파일 형식입니다.',
  [ErrorCode.FILE.FILE_UPLOAD_FAIL]: '파일 업로드에 실패했습니다.',
  [ErrorCode.FILE.FILE_COMPARISON_FAIL]: '파일 비교에 실패했습니다.',

  [ErrorCode.AUTH.UNAUTHORIZED]: '인증 정보가 누락되거나 잘못되었습니다.',
  [ErrorCode.AUTH.ACCESS_DENIED]: '접근 권한이 없습니다.',
  [ErrorCode.AUTH.INVALID_JWT_SIGNATURE]: '잘못된 JWT 서명입니다.',
  [ErrorCode.AUTH.INVALID_TOKEN]: '잘못된 토큰입니다.',
  [ErrorCode.AUTH.NO_COOKIE]: '쿠키가 존재하지 않습니다.',
  [ErrorCode.AUTH.EXPIRED_ACCESS_TOKEN]: '만료된 액세스 토큰입니다.',
  [ErrorCode.AUTH.EXPIRED_REFRESH_TOKEN]: '만료된 리프레쉬 토큰입니다.',

  [ErrorCode.RESOURCE.MEMBER_NOT_FOUND]: '사용자를 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.MEMBER_INACTIVE]: '이미 계정을 삭제한 멤버입니다.',
  [ErrorCode.RESOURCE.SERVER_NOT_FOUND]: '서버를 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.ALREADY_JOINED_SERVER]: '이미 참여하고 있는 서버입니다.',
  [ErrorCode.RESOURCE.DELEGATION_REQUIRED]:
    '해당 요청 처리를 위해서는 서버장 권한을 위임해야 합니다.',
  [ErrorCode.RESOURCE.SERVER_MEMBER_NOT_FOUND]:
    '해당 서버에 사용자가 존재하지 않습니다.',
  [ErrorCode.RESOURCE.SERVER_OWNER_NOT_FOUND]: '서버 주인을 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.INVALID_INVITE_CODE]: '유효하지 않은 초대코드입니다.',
  [ErrorCode.RESOURCE.CATEGORY_NOT_FOUND]: '카테고리를 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.CATEGORY_LOCATE_EXCEPTION]:
    '카테고리 위치를 변경할 수 없습니다.',
  [ErrorCode.RESOURCE.DEFAULT_CATEGORY_EXCEPTION]:
    '기본 카테고리는 수정 또는 삭제가 불가능합니다.',
  [ErrorCode.RESOURCE.CHANNEL_NOT_FOUND]: '채널을 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.CLIMBING_NOT_FOUND]: '클라이밍 채널을 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.ALREADY_JOINED_CLIMBING]:
    '이미 참여하고 있는 클라이밍 채널입니다.',
  [ErrorCode.RESOURCE.CLIMBING_NOT_READY]:
    '모집 중인 클라이밍 채널만 편집할 수 있습니다.',
  [ErrorCode.RESOURCE.OWNER_CANNOT_LEAVE]:
    'OWNER는 클라이밍 채널을 떠날 수 없습니다.',
  [ErrorCode.RESOURCE.CLIMBING_MEMBER_NOT_FOUND]:
    '클라이밍 멤버를 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.CLIMBING_NOT_RUNNING]: '진행 중인 클라이밍이 아닙니다.',
  [ErrorCode.RESOURCE.BOOK_NOT_FOUND]: '책을 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.ALADIN_API_EXCEPTION]: '알라딘 API 호출에 실패했습니다.',
  [ErrorCode.RESOURCE.RECORD_NOT_FOUND]: '레코드를 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.RECORD_NOT_FINISHED]: '다 읽은 책이 아닙니다.',
  [ErrorCode.RESOURCE.ALREADY_EXIST_RECORD]: '이미 존재하는 레코드입니다.',
  [ErrorCode.RESOURCE.REVIEW_NOT_FOUND]: '리뷰를 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.REVIEW_ALREADY_SHARED]:
    '클라이밍 채널에 이미 공유된 리뷰입니다.',
  [ErrorCode.RESOURCE.REVIEW_EMOJI_NOT_FOUND]:
    '리뷰 이모지를 찾을 수 없습니다.',
  [ErrorCode.RESOURCE.ALREADY_EXIST_REVIEW]:
    '이미 레코드에 대한 리뷰가 존재합니다.',
  [ErrorCode.RESOURCE.MESSAGE_ROOM_NOT_FOUND]: '채팅방을 찾을 수 없습니다.',

  [ErrorCode.CHATTING.DIRECT_MESSAGE_NOT_FOUND]:
    '해당 다이렉트 메시지를 찾을 수 없습니다.',
  [ErrorCode.CHATTING.CHANNEL_MESSAGE_NOT_FOUND]:
    '해당 채널 메시지를 찾을 수 없습니다.',
} as const;

type ErrorHandlingType = {
  [K in ErrorCodeType]: 'toast' | 'errorBoundary';
};

export const ERROR_HANDLING: ErrorHandlingType = {
  [ErrorCode.CLIENT.BAD_REQUEST]: 'toast',
  [ErrorCode.CLIENT.MISSING_PARAMETER]: 'toast',
  [ErrorCode.CLIENT.INVALID_ENUM_VALUE]: 'toast',

  [ErrorCode.FILE.INVALID_FILE_FORMAT]: 'toast',
  [ErrorCode.FILE.UNSUPPORTED_FILE_FORMAT]: 'toast',
  [ErrorCode.FILE.FILE_UPLOAD_FAIL]: 'toast',
  [ErrorCode.FILE.FILE_COMPARISON_FAIL]: 'toast',

  [ErrorCode.AUTH.UNAUTHORIZED]: 'toast',
  [ErrorCode.AUTH.ACCESS_DENIED]: 'toast',
  [ErrorCode.AUTH.INVALID_JWT_SIGNATURE]: 'toast',
  [ErrorCode.AUTH.INVALID_TOKEN]: 'toast',
  [ErrorCode.AUTH.NO_COOKIE]: 'toast',
  [ErrorCode.AUTH.EXPIRED_ACCESS_TOKEN]: 'toast',
  [ErrorCode.AUTH.EXPIRED_REFRESH_TOKEN]: 'toast',

  [ErrorCode.RESOURCE.MEMBER_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.MEMBER_INACTIVE]: 'toast',
  [ErrorCode.RESOURCE.SERVER_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.ALREADY_JOINED_SERVER]: 'toast',
  [ErrorCode.RESOURCE.DELEGATION_REQUIRED]: 'toast',
  [ErrorCode.RESOURCE.SERVER_MEMBER_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.SERVER_OWNER_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.INVALID_INVITE_CODE]: 'toast',
  [ErrorCode.RESOURCE.CATEGORY_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.CATEGORY_LOCATE_EXCEPTION]: 'toast',
  [ErrorCode.RESOURCE.DEFAULT_CATEGORY_EXCEPTION]: 'toast',
  [ErrorCode.RESOURCE.CHANNEL_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.CLIMBING_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.ALREADY_JOINED_CLIMBING]: 'toast',
  [ErrorCode.RESOURCE.CLIMBING_NOT_READY]: 'toast',
  [ErrorCode.RESOURCE.OWNER_CANNOT_LEAVE]: 'toast',
  [ErrorCode.RESOURCE.CLIMBING_MEMBER_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.CLIMBING_NOT_RUNNING]: 'toast',
  [ErrorCode.RESOURCE.BOOK_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.ALADIN_API_EXCEPTION]: 'toast',
  [ErrorCode.RESOURCE.RECORD_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.RECORD_NOT_FINISHED]: 'toast',
  [ErrorCode.RESOURCE.ALREADY_EXIST_RECORD]: 'toast',
  [ErrorCode.RESOURCE.REVIEW_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.REVIEW_ALREADY_SHARED]: 'toast',
  [ErrorCode.RESOURCE.REVIEW_EMOJI_NOT_FOUND]: 'toast',
  [ErrorCode.RESOURCE.ALREADY_EXIST_REVIEW]: 'toast',
  [ErrorCode.RESOURCE.MESSAGE_ROOM_NOT_FOUND]: 'toast',

  [ErrorCode.CHATTING.DIRECT_MESSAGE_NOT_FOUND]: 'toast',
  [ErrorCode.CHATTING.CHANNEL_MESSAGE_NOT_FOUND]: 'toast',
};
