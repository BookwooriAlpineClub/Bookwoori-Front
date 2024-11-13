import '@src/styles/reset.css';
import * as serviceWorkerRegistration from '@src/serviceWorkerRegistration';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import GlobalStyle from '@src/styles/global';
import Bottomsheet from '@src/components/common/Bottomsheet';
import Dialog from '@src/components/common/Dialog';
import Toast from '@src/components/common/Toast';
import { RouterProvider } from 'react-router-dom';
import router from '@src/router/Router';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
          <Bottomsheet />
          <Dialog />
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
