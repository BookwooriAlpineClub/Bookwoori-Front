import { css } from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

/**
 * @example
 * <NoDataTextLayout>
 *   <main>
 *     {data.length > 0 ? (
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
/**
 * @example
 * <BottomButtonLayout>
 *   <main>
 *     <태그 className='scroll-area'>
 *       // 스크롤 영역
 *     </태그>
 *     <Button>메인 버튼</Button>
 *   </main>
 * </BottomButtonLayout>
 */
export const BottomButtonLayout = css`
  main {
    display: flex;
    flex-flow: column nowrap;
    gap: ${({ theme }) => theme.gap[16]};

    flex-grow: 1;
    margin-bottom: 2.5rem;

    overflow-y: auto;
  }
  .scroll-area {
    display: flex;
    flex-flow: column nowrap;

    flex-grow: 1;

    overflow-y: scroll;
  }
`;
