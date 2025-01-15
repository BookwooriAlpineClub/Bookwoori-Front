import styled, { css } from 'styled-components';

/**
 * 드래그 및 선택 금지
 */
export const NoSelect = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
/**
 * 텍스트가 지정한 줄수를 초과할 경우, 이후 내용을 말줄임표로 생략합니다.
 * @param line 생략하지 않고 표시할 최대 줄수를 지정합니다.
 * @example
 * import { TextEllipsis } from '@src/styles/mixins';
 * const Span = styled.span<{ $line: number }>`
 *   ${TextEllipsis}
 * `;
 */
export const TextEllipsis = css<{ $line: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $line }) => $line};
  text-overflow: ellipsis;
  overflow: hidden;
`;
/**
 * 책 표지 공통 스타일
 */
export const BookImg = css`
  flex-shrink: 0; // 크기 최적화 비활성화
  object-fit: contain; // 이미지 비율 유지
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
  display: flex;
  flex-flow: column nowrap;

  height: 100%;

  main {
    padding: 0.94rem 5%;
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
export const UnderlineButton = styled.button`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.neutral400};
`;
