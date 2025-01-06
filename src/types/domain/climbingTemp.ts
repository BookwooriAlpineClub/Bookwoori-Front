export interface ClimbingRecruitItem {
  climbingId: number;
  status: 'READY' | 'RUNNING' | 'FINISHED' | 'FAILED';
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  isOWner: boolean;
  bookInfo: {
    title: string;
    author: string;
    publisher: string;
    pubDate: string;
    itemPage: number;
    description: string;
    isbn13: string;
    cover: string;
  };
}

export interface ClimbingRecruitListRes {
  readyClimbingList: ClimbingRecruitItem[];
}

export interface ClimbingParticipants {
  isMine: boolean;
  memberId: number;
  nickname: string;
  profileImg: string | null;
  level: number;
  mountain: string;
  status: 'UNREAD' | 'FINISHED';
  currentPage: number;
  memo: string | null;
}

export interface ClimbingParticipantsRes {
  climbingMemberList: ClimbingParticipants[];
}

export interface ClimbingEditReq {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

type ClimbingListKey = {
  key:
    | 'myClimbings'
    | 'readyClimbings'
    | 'runningClimbings'
    | 'endClimbingings';
};

export interface ClimbingInfo {
  climbingId: number;
  cover?: string;
  name: string;
}

export type ClimbingListRes = {
  [key in ClimbingListKey['key']]: ClimbingInfo[];
};

export type MemoReq = {
  memo: string;
};
