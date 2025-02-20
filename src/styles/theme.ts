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

const rounded = {
  2: '0.125rem',
  4: '0.25rem',
  6: '0.375rem',
  8: '0.5rem',
  12: '0.75rem',
  16: '1rem',
  24: '1.5rem',
} as const;

const padding = {
  2: '0.125rem',
  4: '0.25rem',
  6: '0.375rem',
  8: '0.5rem',
  12: '0.75rem',
  16: '1rem',
  24: '1.5rem',
} as const;

const gap = {
  2: '0.125rem',
  4: '0.25rem',
  6: '0.375rem',
  8: '0.5rem',
  10: '0.625rem',
  12: '0.75rem',
  16: '1rem',
} as const;

const zIndex = {
  toast: '900',
  modal: '800',
  header: '100',
} as const;

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;
export type RoundedTypes = typeof rounded;
export type PaddingTypes = typeof padding;
export type GapTypes = typeof gap;
export type ZIndexTypes = typeof zIndex;

export const theme: DefaultTheme = {
  colors,
  fonts,
  rounded,
  padding,
  gap,
  zIndex,
};
