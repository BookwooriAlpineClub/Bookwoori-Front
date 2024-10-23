import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'HS여름물빛체2.0';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSYeoleum20-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'MaruBuri';
    src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.eot);
    src: url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.eot?#iefix) format("embedded-opentype"), url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2) format("woff2"), url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff) format("woff"), url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.ttf) format("truetype");
  }

  * {
    font-family: 'MaruBuri';
    box-sizing: border-box;
  }
  :root {
    font-family: 'MaruBuri';
    background-color: white;
  }
  button {
    ${({ theme }) => theme.fonts.mountain}
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
