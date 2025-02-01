import { NoSelect } from '@src/styles/mixins';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

/**
 * @example
 * {data.length > 0 ? (
 *       // 데이터 표시
 *     ) : (
 *       <strong>데이터가 없어요.</strong>
 * )}
 */
export const NoDataTextLayout = () => (
  <NoDataTextLayoutStyle>
    <Outlet />
  </NoDataTextLayoutStyle>
);

/**
 * @example
 *     <태그 className='scroll-area'>
 *       // 스크롤 영역
 *     </태그>
 *     <Button>메인 버튼</Button>
 */
export const BottomButtonLayout = () => (
  <BottomButtonLayoutStyle>
    <Outlet />
  </BottomButtonLayoutStyle>
);

// Styled components
const NoDataTextLayoutStyle = styled.div`
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

const BottomButtonLayoutStyle = styled.div`
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
