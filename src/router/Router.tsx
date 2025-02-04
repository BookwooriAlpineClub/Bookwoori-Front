import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import { checkAuthLoader, isParamLoader } from '@src/router/loader';
import {
  RootLayout,
  NoDataTextLayout,
  DefaultLayout,
} from '@src/router/Layout';

/* auth */
const LoginPage = React.lazy(() => import('@src/pages/login/LoginPage'));
const RedirectionPage = React.lazy(
  () => import('@src/pages/login/RedirectionPage'),
);
/* library */
const LibraryHomePage = React.lazy(
  () => import('@src/pages/library/LibraryHomePage'),
);
const SearchPage = React.lazy(() => import('@src/pages/library/SearchPage'));
const RecordListPage = React.lazy(
  () => import('@src/pages/library/RecordListPage'),
);
const ReviewListPage = React.lazy(
  () => import('@src/pages/library/ReviewListPage'),
);
const BookDetailPage = React.lazy(
  () => import('@src/pages/library/BookDetailPage'),
);
const RecordDetailPage = React.lazy(
  () => import('@src/pages/library/RecordDetailPage'),
);
const RecordEditPage = React.lazy(
  () => import('@src/pages/library/RecordEditPage'),
);
/* notification */
const NotificationPage = React.lazy(
  () => import('@src/pages/notification/NotificationPage'),
);
/* dm */
const ChattingListPage = React.lazy(
  () => import('@src/pages/chatting/ChattingListPage'),
);
const ChattingPage = React.lazy(
  () => import('@src/pages/chatting/ChattingPage'),
);
/* settings */
const SettingsPage = React.lazy(
  () => import('@src/pages/userSettings/SettingsPage'),
);
const EditUserInfoPage = React.lazy(
  () => import('@src/pages/userSettings/EditUserInfoPage'),
);
const ExpHistoryPage = React.lazy(
  () => import('@src/pages/userSettings/ExpHistoryPage'),
);
/* add-server */
const AddCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/AddCommunityPage'),
);
const CreateNewCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/CreateNewCommunityPage'),
);
const CheckInvitedCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/CheckInvitedCommunityPage'),
);
const EnterInvitationPage = React.lazy(
  () => import('@src/pages/addcommunity/EnterInvitationPage'),
);
/* server */
const ChannelListPage = React.lazy(
  () => import('@src/pages/channel/ChannelListPage'),
);
const CategoryAddPage = React.lazy(
  () => import('@src/pages/channel/CategoryAddPage'),
);
const ChannelAddPage = React.lazy(
  () => import('@src/pages/channel/ChannelAddPage'),
);
const ChannelEditPage = React.lazy(
  () => import('@src/pages/channel/ChannelEditPage'),
);
const ClimbingEditPage = React.lazy(
  () => import('@src/pages/climbing/ClimbingEditPage'),
);
const ChannelPage = React.lazy(() => import('@src/pages/channel/ChannelPage'));
const ClimbingPage = React.lazy(
  () => import('@src/pages/climbing/ClimbingPage'),
);
const CommunityInfoSettingPage = React.lazy(
  () => import('@src/pages/communityinfosetting/CommunityInfoSettingPage'),
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: checkAuthLoader,
    children: [
      /* No layout */
      {
        path: ROUTE_PATH.library,
        element: <LibraryHomePage />,
      },
      {
        path: ROUTE_PATH.root,
        element: <LibraryHomePage />,
      },
      {
        path: ROUTE_PATH.libraryMember,
        element: <LibraryHomePage />,
        loader: (args) => isParamLoader(args, 'memberId'),
      },
      {
        path: ROUTE_PATH.redirection,
        element: <RedirectionPage />,
      },
      {
        path: ROUTE_PATH.signIn,
        element: <LoginPage />,
      },
      {
        path: ROUTE_PATH.dmChatMember,
        element: <ChattingPage />,
        loader: (args) => isParamLoader(args, 'memberId'),
      },
      {
        path: ROUTE_PATH.serverChannel,
        element: <ChannelPage />,
        loader: (args) => isParamLoader(args, 'serverId'),
      },
      {
        path: '*',
        element: <h1>404 Not Found</h1>,
      },
      /* 기본 Layout */
      {
        element: <DefaultLayout />,
        children: [
          /* addcommunity */
          {
            path: ROUTE_PATH.addServer,
            element: <AddCommunityPage />,
          },
          {
            path: ROUTE_PATH.invitationServer,
            element: <CheckInvitedCommunityPage />,
          },
          {
            path: ROUTE_PATH.createServer,
            element: <CreateNewCommunityPage />,
          },
          {
            path: ROUTE_PATH.invitationCode,
            element: <EnterInvitationPage />,
          },
          {
            path: ROUTE_PATH.joinServer,
            element: <EnterInvitationPage />,
          },
          /* channel */
          {
            path: ROUTE_PATH.addCategory,
            element: <CategoryAddPage />,
          },
          {
            path: ROUTE_PATH.addChannel,
            element: <ChannelAddPage />,
          },
          {
            path: ROUTE_PATH.editChannelOne,
            element: <ChannelEditPage />,
            loader: (args) => isParamLoader(args, 'serverId'),
          },
          {
            path: ROUTE_PATH.server,
            element: <ChannelListPage />,
            loader: (args) => isParamLoader(args, 'serverId'),
          },
          /* chatting */
          {
            path: ROUTE_PATH.dm,
            element: <ChattingListPage />,
          },
          /* climbing */
          {
            path: ROUTE_PATH.climbingEditOne,
            element: <ClimbingEditPage />,
            loader: (args) => isParamLoader(args, 'climbingId'),
          },
          {
            path: ROUTE_PATH.climbing,
            element: <ClimbingPage />,
            loader: (args) => isParamLoader(args, 'climbingId'),
          },
          /* communityinfosetting */
          {
            path: ROUTE_PATH.serverSetting,
            element: <CommunityInfoSettingPage />,
            loader: (args) => isParamLoader(args, 'serverId'),
          },
          /* library */
          {
            path: ROUTE_PATH.libraryBookDetail,
            element: <BookDetailPage />,
            loader: (args) => isParamLoader(args, 'bookId'),
          },
          {
            path: ROUTE_PATH.libraryRecordDetail,
            element: <RecordDetailPage />,
            loader: (args) => isParamLoader(args, 'recordId'),
          },
          {
            path: ROUTE_PATH.libraryEditRecordOne,
            element: <RecordEditPage />,
            loader: (args) => isParamLoader(args, 'recordId'),
          },
          {
            path: ROUTE_PATH.libraryRecord,
            element: <RecordListPage />,
          },
          {
            path: ROUTE_PATH.libraryReview,
            element: <ReviewListPage />,
          },
          /* notification */
          {
            path: ROUTE_PATH.notification,
            element: <NotificationPage />,
          },
          /* user setting */
          {
            path: ROUTE_PATH.settingProfile,
            element: <EditUserInfoPage />,
          },
          {
            path: ROUTE_PATH.settingExp,
            element: <ExpHistoryPage />,
          },
          {
            path: ROUTE_PATH.setting,
            element: <SettingsPage />,
          },
        ],
      },
      /* 데이터가 없는 경우 Layout */
      {
        element: <NoDataTextLayout />,
        children: [
          {
            path: ROUTE_PATH.libraryBookSearch,
            element: <SearchPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
