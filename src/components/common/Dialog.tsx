/*
Dialog 컴포넌트 사용법

1. 열기/닫기 제어
1-1. 부모 컴포넌트에 추가: const [dialogShow, setDialogShow] = useState<boolean>(false);
1-2. 부모 컴포넌트에 추가: {dialogShow && (<Dialog></Dialog>)}

2. props
2-1. setDialogShow={1-1의 setDialogShow}
예시. <Dialog setDialogShow={setDialogShow}></Dialog>

3. 내용
3-1. 부모 컴포넌트에서 <Dialog></Dialog> 안에 작성합니다.
예시.
<Dialog>
  <p>다이얼로그 모달</p>
  <button type='button' onClick={() => setDialogShow(false)}>닫기</button>
</Dialog>
*/

import styled from 'styled-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  setDialogShow(dialogShow: boolean): void;
  children: React.ReactNode;
}

const Dialog = ({ setDialogShow, children }: Props) => {
  useEffect(() => {
    // 모달 마운트 시 스크롤 방지
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;
    `;
    return () => {
      // 모달 언마운트 시 이전 상태로 복원
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return createPortal(
    <Background onClick={() => setDialogShow(false)}>
      <Layout onClick={(event) => event.stopPropagation()}>{children}</Layout>
    </Background>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Dialog;

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800; // Toast 컴포넌트보다 낮은 레벨의 레이어

  width: 100svw;
  height: 100svh;

  background-color: rgba(15, 16, 21, 0.4); // 추후 수정: theme 변수 사용할 것
`;
const Layout = styled.section`
  // 추후 수정: 디자인 작업 중
`;
