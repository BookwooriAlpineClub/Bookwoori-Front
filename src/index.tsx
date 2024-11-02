import './styles/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/global';
import Router from './Router';
import Bottomsheet from '@src/components/common/Bottomsheet';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
          <Bottomsheet />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
