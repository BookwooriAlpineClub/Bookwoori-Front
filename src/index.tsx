import 'src/styles/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from 'src/styles/theme';
import GlobalStyle from 'src/styles/global';
import Router from 'src/Router';
import * as serviceWorkerRegistration from 'src/serviceWorkerRegistration';
import Toast from '@src/components/common/Toast';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
