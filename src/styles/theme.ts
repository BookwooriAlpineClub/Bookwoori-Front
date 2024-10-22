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

interface Font {
  size: number;
  weight: number;
  lineHeight: string;
}

const font = ({ size, weight, lineHeight }: Font): string => {
  return `
    font-size: ${size}rem;
    font-weight: ${weight};
    line-height: ${lineHeight};
  `;
};

const fonts = {
  H1: font({ size: 1.25, weight: 700, lineHeight: 'normal' }),
  H2: font({ size: 1, weight: 600, lineHeight: 'normal' }),
  Caption: font({ size: 0.75, weight: 300, lineHeight: 'normal' }),
  B1: font({ size: 0.875, weight: 600, lineHeight: 'normal' }),
  B2: font({ size: 0.75, weight: 300, lineHeight: 'normal' }),
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = { colors, fonts };
