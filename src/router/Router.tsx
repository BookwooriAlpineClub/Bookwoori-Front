import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import { checkAuthLoader, isParamLoader } from '@src/router/loader';
import {
  RootLayout,
  PaddingLayout,
  BottomButtonLayout,
  NoDataTextLayout,
} from '@src/router/Layout';
import {
  LoginPage,
  LibraryHomePage,
  RedirectionPage,
  ChattingPage,
  ChannelPage,
  AddCommunityPage,
  CheckInvitedCommunityPage,
  CreateNewCommunityPage,
  EnterInvitationPage,
  CategoryAddPage,
  ChannelAddPage,
  ChannelEditPage,
  ChannelListPage,
  ChattingListPage,
  ClimbingEditPage,
  ClimbingPage,
  CommunityInfoSettingPage,
  RecordDetailPage,
  RecordListPage,
  ReviewListPage,
  NotificationPage,
  EditUserInfoPage,
  ExpHistoryPage,
  SettingsPage,
  SearchPage,
} from '@src/router/lazy';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: checkAuthLoader,
    children: [
      /* No layout */
      {
        path: ROUTE_PATH.root,
        element: <LibraryHomePage />,
      },
      {
        path: ROUTE_PATH.signIn,
        element: <LoginPage />,
      },
      {
        path: ROUTE_PATH.redirection,
        element: <RedirectionPage />,
      },
      {
        path: ROUTE_PATH.library,
        element: <LibraryHomePage />,
      },
      {
        path: ROUTE_PATH.libraryMember,
        element: <LibraryHomePage />,
        loader: (args) => isParamLoader(args, 'memberId'),
      },
      {
        path: ROUTE_PATH.dmChatMember,
        element: <ChattingPage />,
        loader: (args) => isParamLoader(args, 'memberId'),
      },
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
      /* PaddingLayout */
      {
        element: <PaddingLayout />,
        children: [
          /* library */
          {
            path: ROUTE_PATH.libraryBookDetail,
            element: <RecordDetailPage />,
            loader: (args) => isParamLoader(args, 'isbn13'),
          },
          {
            path: ROUTE_PATH.libraryRecordDetail,
            element: <RecordDetailPage />,
            loader: (args) => isParamLoader(args, 'isbn13'),
          },
          /* user-setting */
          {
            path: ROUTE_PATH.setting,
            element: <SettingsPage />,
          },
          {
            path: ROUTE_PATH.settingExp,
            element: <ExpHistoryPage />,
          },
          /* add-community */
          {
            path: ROUTE_PATH.addServer,
            element: <AddCommunityPage />,
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
          /* community-info-setting */
          {
            path: ROUTE_PATH.serverSetting,
            element: <CommunityInfoSettingPage />,
            loader: (args) => isParamLoader(args, 'serverId'),
          },
          /* BottomButtonLayout */
          {
            element: <BottomButtonLayout />,
            children: [
              /* user-setting */
              {
                path: ROUTE_PATH.settingProfile,
                element: <EditUserInfoPage />,
              },
              /* add-community */
              {
                path: ROUTE_PATH.createServer,
                element: <CreateNewCommunityPage />,
              },
              {
                path: ROUTE_PATH.invitationServer,
                element: <CheckInvitedCommunityPage />,
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
            ],
          },
          /* NoDataTextLayout */
          {
            element: <NoDataTextLayout />,
            children: [
              /* library */
              {
                path: ROUTE_PATH.libraryBookSearch,
                element: <SearchPage />,
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
              /* chatting */
              {
                path: ROUTE_PATH.dm,
                element: <ChattingListPage />,
              },
            ],
          },
          {
            path: '*',
            element: <h1>404 Not Found</h1>,
          },
        ],
      },
    ],
  },
]);

export default router;
