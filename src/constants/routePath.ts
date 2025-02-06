/* eslint-disable */
export const ROUTE_PATH = {
  /* example */
  example: '/example',
  exampleId: '/example/:id',
  /* auth */
  root: '/',
  signIn: '/sign-in',
  redirection: '/auth/success',
  /* library */
  library: '/library',
  libraryMember: '/library/:memberId',
  libraryBookSearch: '/library/book',
  libraryBookDetail: '/library/book/:isbn13',
  libraryRecord: '/library/record',
  libraryRecordDetail: '/library/record/:isbn13',
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
  serverChannel: '/server/:serverId/:channelId',
  addCategory: '/server/:serverId/create/category',
  addChannel: '/server/:serverId/create/channel',
  editChannelOne: '/server/:serverId/:channelId/edit',
  serverSetting: '/server/:serverId/info-setting',
  /* climbing */
  climbing: '/climbing/:climbingId',
  climbingCreate: '/climbing/create',
  climbingEdit: '/climbing/edit',
  climbingEditOne: '/climbing/edit/:climbingId',
};
