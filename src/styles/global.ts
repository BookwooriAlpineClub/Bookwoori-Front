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
    @supports (width: 100svw) {
      width: 100svw;
      height: 100svh;
    }
    @supports not (width: 100svw) {
      width: 100vw;
      height: 100vh;
    }
    background-color: ${({ theme }) => theme.colors.neutral50};
    ${({ theme }) => theme.fonts.body}
  }
  #root, #modal, #toast {
    width: inherit;
    height: inherit;
  }
  #root {
    &:has(header) {
      padding-top: calc(4.375rem + ${({ theme }) => theme.padding[16]});
    }
  }
  #root > main {
    width: 100%;
    height: 100%;
  }
  #modal {
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.modal};
  }
  #toast {
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.toast};
  }
  button {
    ${({ theme }) => theme.fonts.mountain}
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
