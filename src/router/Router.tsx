import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import React, { Suspense } from 'react';
import isParamLoader from '@src/router/loader';

/* example */
const RouterExamplePage = React.lazy(
  () => import('@src/pages/RouterExamplePage'),
);

const RouterExampleDetailPage = React.lazy(
  () => import('@src/pages/RouterExampleDetailPage'),
);

/* lazy load */
const ChannelListPage = React.lazy(
  () => import('@src/pages/channel/ChannelListPage'),
);
const ClimbingPage = React.lazy(
  () => import('@src/pages/climbing/ClimbingPage'),
);

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<h1>Loading</h1>}>
        <Outlet />
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
        path: ROUTE_PATH.signIn,
        element: <h1>Sign In Page</h1>,
      },
      /* library */
      {
        path: ROUTE_PATH.library,
        element: <h1>Library Page</h1>,
      },
      {
        path: ROUTE_PATH.libraryMember,
        element: <h1>Library Member Page</h1>,
        loader: (args) => isParamLoader(args, 'memberId'),
      },
      {
        path: ROUTE_PATH.libraryBookSearch,
        element: <h1>Library Book Search</h1>,
      },
      {
        path: ROUTE_PATH.libraryBookDetail,
        element: <h1>Library Book Detail</h1>,
        loader: (args) => isParamLoader(args, 'bookId'),
      },
      {
        path: ROUTE_PATH.libraryRecord,
        element: <h1>Library Record</h1>,
      },
      {
        path: ROUTE_PATH.libraryRecordDetail,
        element: <h1>Library Record Detail</h1>,
        loader: (args) => isParamLoader(args, 'recordId'),
      },
      {
        path: ROUTE_PATH.libraryEditRecordOne,
        element: <h1>Library Record Edit</h1>,
        loader: (args) => isParamLoader(args, 'recordId'),
      },
      {
        path: ROUTE_PATH.libraryReview,
        element: <h1>Library Review</h1>,
      },
      /* notification */
      {
        path: ROUTE_PATH.notification,
        element: <h1>Notification Page</h1>,
      },
      /* dm */
      {
        path: ROUTE_PATH.dm,
        element: <h1>Direct Message Page</h1>,
      },
      {
        path: ROUTE_PATH.dmChatMember,
        element: <h1>DM Chat Page</h1>,
        loader: (args) => isParamLoader(args, 'memberId'),
      },
      /* setting */
      {
        path: ROUTE_PATH.setting,
        element: <h1>Settings Page</h1>,
      },
      {
        path: ROUTE_PATH.settingProfile,
        element: <h1>Profile Settings Page</h1>,
      },
      {
        path: ROUTE_PATH.settingExp,
        element: <h1>Experience Settings Page</h1>,
      },
      /* add-server */
      {
        path: ROUTE_PATH.addServer,
        element: <h1>Add Server Page</h1>,
      },
      {
        path: ROUTE_PATH.createServer,
        element: <h1>Create Server Page</h1>,
      },
      {
        path: ROUTE_PATH.invitationCode,
        element: <h1>Invitation Code Page</h1>,
      },
      {
        path: ROUTE_PATH.invitationServer,
        element: <h1>Invitation Server Page</h1>,
      },
      {
        path: ROUTE_PATH.joinServer,
        element: <h1>Join Server Page</h1>,
      },
      /* server */
      {
        path: ROUTE_PATH.server,
        element: <ChannelListPage />,
        loader: (args) => isParamLoader(args, 'serverId'),
      },
      {
        path: ROUTE_PATH.serverChannel,
        element: <h1>Server Channel Page</h1>,
        loader: (args) => isParamLoader(args, 'serverId'),
      },
      {
        path: ROUTE_PATH.addServer,
        element: <h1>Add Channel Page</h1>,
      },
      {
        path: ROUTE_PATH.editChannelOne,
        element: <h1>Edit Channel Page</h1>,
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
        element: <h1>Create Climbing Page</h1>,
      },
      {
        path: ROUTE_PATH.climbingEdit,
        element: <h1>Edit Climbing Page</h1>,
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
