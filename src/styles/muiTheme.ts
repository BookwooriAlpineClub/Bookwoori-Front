import { createTheme, ThemeOptions } from '@mui/material/styles';
import { theme as styledTheme } from '@src/styles/theme';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: styledTheme.colors.blue100, // styled-components 색상 연결
    },
    secondary: {
      main: styledTheme.colors.neonGreen,
    },
    background: {
      default: styledTheme.colors.black300,
    },
    text: {
      primary: styledTheme.colors.black100,
    },
  },
  typography: {
    fontFamily: "'MaruBuri', 'HS여름물빛체2.0', sans-serif", // styled-components 폰트 연결
    body1: {
      fontSize: '0.8125rem',
    },
    body2: {
      fontSize: '0.6875rem',
    },
  },
} as ThemeOptions);

export default muiTheme;
