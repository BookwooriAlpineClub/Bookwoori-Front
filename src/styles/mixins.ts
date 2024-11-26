import styled, { css } from 'styled-components';

export const NoSelect = css`
  // 드래그 및 선택 금지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
/**
 * @example
 * <ListLayout>
 *   <main>
 *     {data.length === 0 ? (
 *       <strong>데이터가 없어요.</strong>
 *     ) : (
 *       <ul>{data.map()}</ul>
 *     )}
 *   </main>
 * </ListLayout>
 */
export const ListLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;

  main:has(strong) {
    display: flex;

    flex-grow: 1;
  }
  strong {
    margin: auto;

    ${({ theme }) => theme.fonts.body}
    color: ${({ theme }) => theme.colors.black200};

    ${NoSelect}
  }
  ul,
  ol {
    margin: 0.94rem 5%;
  }
`;
