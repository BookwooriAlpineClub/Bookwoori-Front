import { DefaultTheme } from 'styled-components';

const colors = {
  1: '#D1FD57',
  2: '#6761FE',
  3: '#D9D9FB',
  4: '#EEF2FF',
  black: '#1D1C20',
  gray1: '#ACACAC',
  gray2: '#F5F5F5',
  white: '#',
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
