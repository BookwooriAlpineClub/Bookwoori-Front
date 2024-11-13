/* eslint-disable */
export const ROUTE_PATH = {
  /* example */
  example: '/example',
  exampleId: '/example/:id',
  /* auth */
  test: '/test',
  root: '/',
  signUp: '/sign-up',
  signIn: '/sign-in',
  /* library */
  library: '/library',
  libraryMember: '/library/:memberId',
  libraryBookSearch: '/library/book/search',
  libraryBookDetail: '/library/book/:bookId',
  libraryRecord: '/library/record',
  libraryRecordDetail: '/library/record/:recordId',
  libraryEditRecord: '/library/record/edit/:recordId',
  libraryReview: '/library/review',
  /* notification */
  notification: '/notification',
  /* dm */
  dm: '/dm',
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
  /* climbing */
  climbing: '/climbing/:climbingId',
  climbingCreate: '/climbing/create',
  climbingEdit: '/climbing/edit/:climbingId',
};
