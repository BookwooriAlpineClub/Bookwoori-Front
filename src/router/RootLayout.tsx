import React from 'react';
import { Outlet } from 'react-router-dom';
import Bottomsheet from '@src/components/common/Bottomsheet';
import Dialog from '@src/components/common/Dialog';
import CommunitySideBar from '@src/components/communitysidebar/CommunitySideBar';
import RootErrorBoundary from '@src/components/errorBoundary/RootErrorBoundary';
import ErrorCatcher from '@src/components/errorBoundary/ErrorCatcher';
import QueryClientBoundary from '@src/components/queryClient/QueryClientBoundary';
import LoadingPage from '@src/pages/fallback/LoadingPage';

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
