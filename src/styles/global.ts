import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Pretendard;
    box-sizing: border-box;
  }
  :root {
    font-family: Pretendard;
    background-color: white;
  }
  #root {
    width: 100svw;
    height: 100svh;
  }
  /* 스크롤바 비표시 */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
