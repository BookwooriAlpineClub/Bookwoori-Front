import React from 'react';

/* add-community */
export const AddCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/AddCommunityPage'),
);
export const CheckInvitedCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/CheckInvitedCommunityPage'),
);
export const CreateNewCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/CreateNewCommunityPage'),
);
export const EnterInvitationPage = React.lazy(
  () => import('@src/pages/addcommunity/EnterInvitationPage'),
);

/* channel */
export const CategoryAddPage = React.lazy(
  () => import('@src/pages/channel/CategoryAddPage'),
);
export const ChannelAddPage = React.lazy(
  () => import('@src/pages/channel/ChannelAddPage'),
);
export const ChannelEditPage = React.lazy(
  () => import('@src/pages/channel/ChannelEditPage'),
);
export const ChannelListPage = React.lazy(
  () => import('@src/pages/channel/ChannelListPage'),
);

export const ChannelPage = React.lazy(
  () => import('@src/pages/channel/ChannelPage'),
);

/* chatting */
export const ChattingListPage = React.lazy(
  () => import('@src/pages/chatting/ChattingListPage'),
);
export const ChattingPage = React.lazy(
  () => import('@src/pages/chatting/ChattingPage'),
);

/* climbing */
export const ClimbingEditPage = React.lazy(
  () => import('@src/pages/climbing/ClimbingEditPage'),
);

export const ClimbingPage = React.lazy(
  () => import('@src/pages/climbing/ClimbingPage'),
);

/* community-info-setting */
export const CommunityInfoSettingPage = React.lazy(
  () => import('@src/pages/communityinfosetting/CommunityInfoSettingPage'),
);

/* library */
export const BookDetailPage = React.lazy(
  () => import('@src/pages/library/BookDetailPage'),
);
export const LibraryHomePage = React.lazy(
  () => import('@src/pages/library/LibraryHomePage'),
);
export const RecordDetailPage = React.lazy(
  () => import('@src/pages/library/RecordDetailPage'),
);
export const RecordEditPage = React.lazy(
  () => import('@src/pages/library/RecordEditPage'),
);
export const RecordListPage = React.lazy(
  () => import('@src/pages/library/RecordListPage'),
);
export const ReviewListPage = React.lazy(
  () => import('@src/pages/library/ReviewListPage'),
);
export const SearchPage = React.lazy(
  () => import('@src/pages/library/SearchPage'),
);

/* login */
export const LoginPage = React.lazy(() => import('@src/pages/login/LoginPage'));
export const RedirectionPage = React.lazy(
  () => import('@src/pages/login/RedirectionPage'),
);

/* notification */
export const NotificationPage = React.lazy(
  () => import('@src/pages/notification/NotificationPage'),
);

/* user-setting */
export const EditUserInfoPage = React.lazy(
  () => import('@src/pages/userSettings/EditUserInfoPage'),
);
export const ExpHistoryPage = React.lazy(
  () => import('@src/pages/userSettings/ExpHistoryPage'),
);
export const SettingsPage = React.lazy(
  () => import('@src/pages/userSettings/SettingsPage'),
);
