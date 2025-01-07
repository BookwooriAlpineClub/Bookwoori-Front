export interface ServerMember {
  memberId: number;
  nickname: string;
  profileImg: string | null;
  level: number;
  mountain: string;
  role: 'OWNER' | 'MEMBER';
}
