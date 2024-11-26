import styled, { css } from 'styled-components';

export const NoSelect = css`
  // 드래그 및 선택 금지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
export const ListLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;

  // 데이터 없는 경우 텍스트 표시
  strong {
    margin: auto;

    ${({ theme }) => theme.fonts.body}
    color: ${({ theme }) => theme.colors.black200};
  }
`;
