import { DefaultTheme } from 'styled-components';

const colors = {
  neonGreen: '#D1FD57',
  blue100: '#3660F9',
  blue200: '#96B8FF',
  blue300: '#EEF2FF',
  black100: '#0F1015',
  black200: '#A5A5A5',
  black300: '#FAFAFA',
  white: '#FFFFFF',
  blackOverlay: 'rgba(15, 16, 21, 0.40)',
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
  `,
  body: `
    font-family: 'MaruBuri';
    font-size: 0.8125rem;
    font-weight: 600;
    line-height: 1.25rem;
  `,
  caption: `
    font-family: 'MaruBuri';
    font-size: 0.6875rem;
    font-weight: 400;
    letter-spacing: -0.02063rem;
  `,
  nickname: `
    font-family: 'MaruBuri';
    font-size: 1.25rem;
    font-weight: 700;
  `,
  mountain: `
    font-family: 'MaruBuri';
    font-size: 0.875rem;
    font-weight: 700;
  `,
} as const;

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = { colors, fonts };
