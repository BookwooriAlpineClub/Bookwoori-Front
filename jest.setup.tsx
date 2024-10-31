// 전역 import
import '@testing-library/jest-dom';

// 전역 환경설정
import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import GlobalStyle from '@src/styles/global';
import { render as tlrRender } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const renderWithProviders = (ui: ReactNode, options?: RenderOptions) => {
  return tlrRender(<Provider>{ui}</Provider>, options);
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace globalThis {
    // eslint-disable-next-line no-var, vars-on-top
    var render: typeof renderWithProviders;
  }
}

global.render = renderWithProviders;
