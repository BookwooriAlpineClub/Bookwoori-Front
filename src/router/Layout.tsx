import React from 'react';
import { Outlet } from 'react-router-dom';
import QueryClientBoundary from '@src/components/queryClient/QueryClientBoundary';
import RootErrorBoundary from '@src/components/errorBoundary/RootErrorBoundary';
import ErrorCatcher from '@src/components/errorBoundary/ErrorCatcher';
import LoadingPage from '@src/pages/fallback/LoadingPage';
import Bottomsheet from '@src/components/common/modal/Bottomsheet';
import Dialog from '@src/components/common/modal/Dialog';
import GlobalDrawer from '@src/components/common/modal/GlobalDrawer';
import CommunityDrawer from '@src/components/common/modal/CommunityDrawer';
import {
  PaddingLayout as PaddingLayoutStyle,
  BottomButtonLayout as BottomButtonLayoutStyle,
  NoDataTextLayout as NoDataTextLayoutStyle,
} from '@src/styles/Layout';

const RootLayout = () => (
  <QueryClientBoundary>
    <RootErrorBoundary>
      <ErrorCatcher>
        <React.Suspense fallback={<LoadingPage />}>
          <Outlet />
          <Bottomsheet />
          <Dialog />
          <GlobalDrawer />
          <CommunityDrawer />
        </React.Suspense>
      </ErrorCatcher>
    </RootErrorBoundary>
  </QueryClientBoundary>
);
const PaddingLayout = () => (
  <PaddingLayoutStyle>
    <Outlet />
  </PaddingLayoutStyle>
);
const BottomButtonLayout = () => (
  <BottomButtonLayoutStyle>
    <Outlet />
  </BottomButtonLayoutStyle>
);
const NoDataTextLayout = () => (
  <NoDataTextLayoutStyle>
    <Outlet />
  </NoDataTextLayoutStyle>
);

export { RootLayout, PaddingLayout, BottomButtonLayout, NoDataTextLayout };
