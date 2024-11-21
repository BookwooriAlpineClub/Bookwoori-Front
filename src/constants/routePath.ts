/* eslint-disable */
export const ROUTE_PATH = {
  /* example */
  example: '/example',
  exampleId: '/example/:id',
  /* auth */
  root: '/',
  signIn: '/sign-in',
  /* library */
  library: '/library',
  libraryMember: '/library/:memberId',
  libraryBookSearch: '/library/book',
  libraryBookDetail: '/library/book/:bookId',
  libraryRecord: '/library/record',
  libraryRecordDetail: '/library/record/:recordId',
  libraryEditRecord: '/library/record/edit',
  libraryEditRecordOne: '/library/record/:recordId/edit',
  libraryReview: '/library/review',
  /* notification */
  notification: '/notification',
  /* dm */
  dm: '/dm',
  dmChat: '/dm/chat',
  dmChatMember: '/dm/chat/:memberId',
  /* setting */
  setting: '/setting',
  settingProfile: '/setting/profile',
  settingExp: '/setting/exp',
  /* add-server */
  addServer: '/add-server',
  createServer: '/add-server/create',
  invitationCode: '/add-server/invitation',
  invitationServer: '/add-server/invitation/:invitationCode',
  joinServer: '/add-server/join',
  /* server */
  server: '/server/:serverId',
  serverChannel: '/server/:serverId/category/:categoryId/channel/:channelId',
  serverChannel: '/server/:serverId/:channelId',
  /* climbing */
  climbing: '/climbing/:climbingId',
  climbingCreate: '/climbing/create',
  climbingEdit: '/climbing/edit',
  climbingEditOne: '/climbing/edit/:climbingId',
};
