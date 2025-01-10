import { DefaultTheme } from 'styled-components';

const colors = {
  lime100: '#ecfccb',
  lime300: '#bef264',
  blue100: '#dbeafe',
  blue300: '#93c5fd',
  blue500: '#3b82f6',
  blue700: '#1d4ed8',
  blue900: '#1e3a8a',
  neutral0: '#ffffff',
  neutral50: '#fafafa',
  neutral200: '#e5e5e5',
  neutral400: '#a3a3a3',
  neutral600: '#525252',
  neutral800: '#262626',
  neutral950: '#0a0a0a',
  overlay: '#0a0a0a66',
} as const;

const fonts = {
  title: `
    font-family: 'HS여름물빛체2.0';
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: 0.01875rem;
  `,
  header: `
    font-family: 'MaruBuri';
    font-size: 1rem;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
  `,
  body: `
    font-family: 'MaruBuri';
    font-size: 0.8125rem;
    font-weight: 600;
    line-height: 1.25rem;
    letter-spacing: normal;
  `,
  caption: `
    font-family: 'MaruBuri';
    font-size: 0.6875rem;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.02063rem;
  `,
  nickname: `
    font-family: 'MaruBuri';
    font-size: 1.25rem;
    font-weight: 700;
    line-height: normal;
    letter-spacing: normal;
  `,
  mountain: `
    font-family: 'MaruBuri';
    font-size: 0.875rem;
    font-weight: 700;
    line-height: normal;
    letter-spacing: normal;
  `,
} as const;

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = { colors, fonts };
