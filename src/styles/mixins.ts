import { css } from 'styled-components';

export const NoSelect = css`
  // 드래그 및 선택 금지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
