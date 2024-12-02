import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import React, { Suspense } from 'react';
import isParamLoader from '@src/router/loader';
import Bottomsheet from '@src/components/common/Bottomsheet';
import Dialog from '@src/components/common/Dialog';
import CommunitySideBar from '@src/components/communitysidebar/CommunitySideBar';

/* example */
const RouterExamplePage = React.lazy(
  () => import('@src/pages/RouterExamplePage'),
);

const RouterExampleDetailPage = React.lazy(
  () => import('@src/pages/RouterExampleDetailPage'),
);

/* lazy load */
const SearchPage = React.lazy(() => import('@src/pages/book/SearchPage'));
const ReviewListPage = React.lazy(
  () => import('@src/pages/book/ReviewListPage'),
);
const ChannelListPage = React.lazy(
  () => import('@src/pages/channel/ChannelListPage'),
);
const ChannelAddPage = React.lazy(
  () => import('@src/pages/channel/ChannelAddPage'),
);
const ClimbingPage = React.lazy(
  () => import('@src/pages/climbing/ClimbingPage'),
);
/* library */
const BookDetailPage = React.lazy(
  () => import('@src/pages/book/BookDetailPage'),
);
const RecordListPage = React.lazy(
  () => import('@src/pages/book/RecordListPage'),
);
const RecordDetailPage = React.lazy(
  () => import('@src/pages/book/RecordDetailPage'),
);
/* settings */
const SettingsPage = React.lazy(
  () => import('@src/pages/userSettings/SettingsPage'),
);
const ExpHistoryPage = React.lazy(
  () => import('@src/pages/userSettings/ExpHistoryPage'),
);
const EditUserInfoPage = React.lazy(
  () => import('@src/pages/userSettings/EditUserInfoPage'),
);

/* auth */
const LoginPage = React.lazy(() => import('@src/pages/login/LoginPage'));
const RedirectionPage = React.lazy(
  () => import('@src/pages/login/RedirectionPage'),
);

/* dm */
const ChattingListPage = React.lazy(
  () => import('@src/pages/chatting/ChattingListPage'),
);
const ChattingPage = React.lazy(
  () => import('@src/pages/chatting/ChattingPage'),
);

/* server */
const ChannelEditPage = React.lazy(
  () => import('@src/pages/channel/ChannelEditPage'),
);
const ChannelPage = React.lazy(() => import('@src/pages/channel/ChannelPage'));
const CommunityInfoSettingPage = React.lazy(
  () => import('@src/pages/communityinfosetting/CommunityInfoSettingPage'),
);

/* add-server */
const AddCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/AddCommunityPage'),
);
const CreateNewCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/CreateNewCommunityPage'),
);
const EnterInvitationPage = React.lazy(
  () => import('@src/pages/addcommunity/EnterInvitationPage'),
);
const CheckInvitedCommunityPage = React.lazy(
  () => import('@src/pages/addcommunity/CheckInvitedCommunityPage'),
);

/* climbing */
const ClimbingAddPage = React.lazy(
  () => import('@src/pages/channel/ChannelAddPage'),
);
const ClimbingEditPage = React.lazy(
  () => import('@src/pages/climbing/ClimbingEditPage'),
);

/* library */
const LibraryHomePage = React.lazy(
  () => import('@src/pages/library/LibraryHomePage'),
);

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <Outlet />
        <Bottomsheet />
        <Dialog />
        <CommunitySideBar />
      </Suspense>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      /* example */
      {
        path: ROUTE_PATH.example,
        element: <RouterExamplePage />,
      },
      {
        path: ROUTE_PATH.exampleId,
        element: <RouterExampleDetailPage />,
        loader: (args) => isParamLoader(args, 'id'),
      },
      /* auth */
      {
        path: ROUTE_PATH.root,
        element: <h1>Root</h1>,
      },
      {
        path: ROUTE_PATH.redirection,
        element: <RedirectionPage />,
      },
      {
        path: ROUTE_PATH.signIn,
        element: <LoginPage />,
      },
      /* library */
      {
        path: ROUTE_PATH.library,
        element: <LibraryHomePage />,
      },
      {
        path: ROUTE_PATH.libraryMember,
        element: <h1>Library Member Page</h1>,
        loader: (args) => isParamLoader(args, 'memberId'),
      },
      {
        path: ROUTE_PATH.libraryBookSearch,
        element: <SearchPage />,
      },
      {
        path: ROUTE_PATH.libraryBookDetail,
        element: <BookDetailPage />,
        loader: (args) => isParamLoader(args, 'bookId'),
      },
      {
        path: ROUTE_PATH.libraryRecord,
        element: <RecordListPage />,
      },
      {
        path: ROUTE_PATH.libraryRecordDetail,
        element: <RecordDetailPage />,
        loader: (args) => isParamLoader(args, 'recordId'),
      },
      {
        path: ROUTE_PATH.libraryEditRecordOne,
        element: <h1>Library Record Edit</h1>,
        loader: (args) => isParamLoader(args, 'recordId'),
      },
      {
        path: ROUTE_PATH.libraryReview,
        element: <ReviewListPage />,
      },
      /* notification */
      {
        path: ROUTE_PATH.notification,
        element: <h1>Notification Page</h1>,
      },
      /* dm */
      {
        path: ROUTE_PATH.dm,
        element: <ChattingListPage />,
      },
      {
        path: ROUTE_PATH.dmChatMember,
        element: <ChattingPage />,
        loader: (args) => isParamLoader(args, 'memberId'),
      },
      /* setting */
      {
        path: ROUTE_PATH.setting,
        element: <SettingsPage />,
      },
      {
        path: ROUTE_PATH.settingProfile,
        element: <EditUserInfoPage />,
      },
      {
        path: ROUTE_PATH.settingExp,
        element: <ExpHistoryPage />,
      },
      /* add-server */
      {
        path: ROUTE_PATH.addServer,
        element: <AddCommunityPage />,
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
        path: ROUTE_PATH.invitationServer,
        element: <CheckInvitedCommunityPage />,
      },
      {
        path: ROUTE_PATH.joinServer,
        element: <EnterInvitationPage />,
      },
      /* server */
      {
        path: ROUTE_PATH.server,
        element: <ChannelListPage />,
        loader: (args) => isParamLoader(args, 'serverId'),
      },
      {
        path: ROUTE_PATH.serverChannel,
        element: <ChannelPage />,
        loader: (args) => isParamLoader(args, 'serverId'),
      },
      {
        path: ROUTE_PATH.addCategory,
        element: <h1>Add Category Page</h1>,
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
        path: ROUTE_PATH.serverSetting,
        element: <CommunityInfoSettingPage />,
        loader: (args) => isParamLoader(args, 'serverId'),
      },
      /* climbing */
      {
        path: ROUTE_PATH.climbing,
        element: <ClimbingPage />,
        loader: (args) => isParamLoader(args, 'climbingId'),
      },
      {
        path: ROUTE_PATH.climbingCreate,
        element: <ClimbingAddPage type='climb' />,
      },
      {
        path: ROUTE_PATH.climbingEditOne,
        element: <ClimbingEditPage />,
        loader: (args) => isParamLoader(args, 'climbingId'),
      },
      /* 404 */
      {
        path: '*',
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);

export default router;
