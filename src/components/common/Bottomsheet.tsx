/*
Bottomsheet 컴포넌트 사용법

1. 마운트/언마운트 제어
1-1. 부모 컴포넌트에 <Bottomsheet></Bottomsheet>를 추가한다.
1-2. 부모 컴포넌트에 state를 추가한다.
const [isBottomsheetShow, setIsBottomsheetShow] = useState<boolean>(false);
1-3. 부모 컴포넌트에서 setIsBottomsheetShow로 제어한다.

2. props
<Bottomsheet
  isBottomsheetShow={isBottomsheetShow} // 1-2의 isBottomsheetShow
  setIsBottomsheetShow={setIsBottomsheetShow} // 1-2의 setIsBottomsheetShow
>

3. 내용
3-1. 부모 컴포넌트에서 <Bottomsheet></Bottomsheet> 안에 작성한다.
<Bottomsheet>
  <p>바텀시트 모달</p>
  <button type='button' onClick={() => setIsBottomsheetShow(false)}>닫기</button>
</Bottomsheet>
*/

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isBottomsheetShow: boolean;
  setIsBottomsheetShow(isBottomsheetShow: boolean): void;
  children: React.ReactNode;
}

const Bottomsheet = ({
  isBottomsheetShow,
  setIsBottomsheetShow,
  children,
}: Props) => {
  const [isMount, setIsMount] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isBottomsheetShow) {
      // 스크롤 방지
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;
      `;
      setIsMount(true);
      setTimeout(() => setIsOpen(true), 30); // 마운트 후 slideUp
    } else {
      setIsOpen(false); // slideDown
      setTimeout(() => setIsMount(false), 300); // 트랜지션 후 언마운트
      // 스크롤 복원
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, [isBottomsheetShow]);

  return createPortal(
    <div>
      {isMount && (
        <Scrim $isOpen={isOpen} onClick={() => setIsBottomsheetShow(false)}>
          <Layout $isOpen={isOpen} onClick={(event) => event.stopPropagation()}>
            <HandleBar />
            <article>{children}</article>
          </Layout>
        </Scrim>
      )}
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Bottomsheet;

const Scrim = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;

  width: 100svw;
  height: 100svh;

  background-color: ${({ $isOpen }) =>
    $isOpen
      ? 'rgba(15, 16, 21, 0.40)'
      : 'rgba(0, 0, 0, 0)'}; // 추후 수정: theme.colors

  transition: background-color 0.3s ease;
`;
const Layout = styled.section<{ $isOpen: boolean }>`
  position: fixed;
  bottom: ${({ $isOpen }) => ($isOpen ? 0 : -100)}svh;

  width: 100svw;
  padding: 1.44rem 1.25rem 1.25rem 1.25rem;

  border-radius: 1.875rem 1.875rem 0rem 0rem;
  background-color: #fafafa; // 추후 수정: theme.colors

  transition: bottom 0.3s ease;
`;
const HandleBar = styled.button`
  position: absolute;
  top: 0.625rem;
  left: 50%;
  transform: translateX(-50%);

  width: 1.875rem;
  height: 0.1875rem;

  border-radius: 6.1875rem;
  background-color: #96b8ff; // 추후 수정: theme.colors
`;
