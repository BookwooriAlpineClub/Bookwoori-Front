import React from 'react';
import { Outlet } from 'react-router-dom';
import QueryClientBoundary from '@src/components/queryClient/QueryClientBoundary';
import RootErrorBoundary from '@src/components/errorBoundary/RootErrorBoundary';
import ErrorCatcher from '@src/components/errorBoundary/ErrorCatcher';
import LoadingPage from '@src/pages/fallback/LoadingPage';
import Bottomsheet from '@src/components/common/Bottomsheet';
import Dialog from '@src/components/common/Dialog';
import CommunitySideBar from '@src/components/communitysidebar/CommunitySideBar';
import {
  NoDataTextLayout as NoDataTextLayoutStyle,
  BottomButtonLayout as BottomButtonLayoutStyle,
} from '@src/styles/Layout';

export const RootLayout = () => (
  <QueryClientBoundary>
    <RootErrorBoundary>
      <ErrorCatcher>
        <React.Suspense fallback={<LoadingPage />}>
          <Outlet />
          <Bottomsheet />
          <Dialog />
          <CommunitySideBar />
        </React.Suspense>
      </ErrorCatcher>
    </RootErrorBoundary>
  </QueryClientBoundary>
);

export const NoDataTextLayout = () => (
  <NoDataTextLayoutStyle>
    <Outlet />
  </NoDataTextLayoutStyle>
);

export const BottomButtonLayout = () => (
  <BottomButtonLayoutStyle>
    <Outlet />
  </BottomButtonLayoutStyle>
);
