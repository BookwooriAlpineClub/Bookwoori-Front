export interface ClimbingRecruitItem {
  climbingId: number;
  status: 'READY';
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  memberCount: number;
  isJoined: true;
  isOWner: false;
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
  key: 'myClimbings' | 'readyClimbings';
};

export interface ClimbingInfo {
  climbingId: number;
  cover: string;
  name: string;
}

export type ClimbingListRes = {
  [key in ClimbingListKey['key']]: ClimbingInfo[];
};

export type MemoReq = {
  memo: string;
};
