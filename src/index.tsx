import '@src/styles/reset.css';
import '@src/firebase';
import * as serviceWorkerRegistration from '@src/serviceWorkerRegistration';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import GlobalStyle from '@src/styles/global';
import { RouterProvider } from 'react-router-dom';
import router from '@src/router/Router';
import Toast from '@src/components/common/Toast';
import {
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import muiTheme from '@src/styles/muiTheme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <MUIThemeProvider theme={muiTheme}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <RouterProvider router={router} />
              <Toast />
            </ThemeProvider>
          </MUIThemeProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
