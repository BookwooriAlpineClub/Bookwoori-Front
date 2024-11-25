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
  status: 'UNREAD';
  currentPage: number;
  memo: string | null;
}

export interface ClimbingParticipantsRes {
  climbingMemberList: ClimbingParticipants[];
}
