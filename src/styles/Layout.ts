import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

export const PaddingLayout = styled.div`
  width: 100%;
  min-height: 100%;
  padding: ${({ theme }) => theme.padding[16]};

  &:has(header) {
    padding-top: 0;
  }
  &:has(strong) {
    height: 100%;
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
export const BottomButtonLayout = styled.div`
  display: flex;
  @supports (height: 100svh) {
    height: calc(100svh - 4.375rem - 2rem);
  }
  @supports not (height: 100svh) {
    height: calc(100vh - 4.375rem - 2rem);
  }

  main {
    display: flex;
    flex-flow: column nowrap;
    gap: ${({ theme }) => theme.gap[16]};

    flex-grow: 1;

    overflow-y: auto;
  }
  .scroll-area {
    display: flex;
    flex-flow: column nowrap;

    flex-grow: 1;

    overflow-y: scroll;
  }
  main > button {
    margin-bottom: 1.56rem;
  }
`;
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
  &:has(strong) {
    display: flex;
    height: 100%;
  }
  main {
    width: 100%;
  }
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
