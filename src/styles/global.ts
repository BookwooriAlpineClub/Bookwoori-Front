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

  body {
    width: 100svw;
    height: 100svh;
    background-color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.body}
  }
  button {
    ${({ theme }) => theme.fonts.mountain}
  }
  /* 스크롤바 비표시 */
  ::-webkit-scrollbar {
    display: none;
  }

  #toast {
    position: fixed;
    z-index: 900;
  }
  #modal {
    position: fixed;
    z-index: 800;
  }
`;

export default GlobalStyle;
