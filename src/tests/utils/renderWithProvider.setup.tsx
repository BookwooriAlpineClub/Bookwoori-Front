import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

export default renderWithProviders;
