import styled from 'styled-components';
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
export const NoDataTextLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 ${({ theme }) => theme.padding[16]};

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
 * <DefaultLayout>
 *   <main>
 *     <태그 className='scroll-area'>
 *       // 스크롤 영역
 *     </태그>
 *     <Button>메인 버튼</Button>
 *   </main>
 * </DefaultLayout>
 */
export const DefaultLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 ${({ theme }) => theme.padding[16]};

  main {
    display: flex;
    flex-flow: column nowrap;
    gap: ${({ theme }) => theme.gap[16]};

    flex-grow: 1;
    margin-bottom: 1.5rem;

    overflow-y: auto;
  }
  .scroll-area {
    display: flex;
    flex-flow: column nowrap;

    flex-grow: 1;

    overflow-y: scroll;
    width: 100%;
  }
`;
