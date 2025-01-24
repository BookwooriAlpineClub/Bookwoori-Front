import { css } from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

/**
 * @example
 * <NoDataTextLayout>
 *   <main>
 *     {data ? (
 *       // 데이터 표시
 *     ) : (
 *       <strong>데이터가 없어요.</strong>
 *     )}
 *   </main>
 * </NoDataTextLayout>
 */
export const NoDataTextLayout = css`
  main:has(strong) {
    display: flex;

    flex-grow: 1;
  }
  strong {
    margin: auto;

    ${({ theme }) => theme.fonts.body}
    color: ${({ theme }) => theme.colors.neutral400};

    ${NoSelect}
  }
`;
