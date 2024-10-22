/*
Dialog 컴포넌트 사용법

1. 마운트/언마운트 제어
1-1. 부모 컴포넌트에 <Dialog></Dialog>를 추가한다.
1-2. 부모 컴포넌트에 state를 추가한다.
const [isDialogShow, setIsDialogShow] = useState<boolean>(false);
1-3. 부모 컴포넌트에서 setIsDialogShow로 제어한다.

2. props
<Dialog
  isDialogShow={isDialogShow} // 1-2의 isDialogShow
  setIsDialogShow={setIsDialogShow} // 1-2의 setIsDialogShow
>

3. 내용
3-1. 부모 컴포넌트에서 <Dialog></Dialog> 안에 작성한다.
<Dialog>
  <p>다이얼로그 모달</p>
  <button type='button' onClick={() => setIsDialogShow(false)}>닫기</button>
</Dialog>
*/

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Scrim from './Scrim';

interface Props {
  isDialogShow: boolean;
  setIsDialogShow(isDialogShow: boolean): void;
  children: React.ReactNode;
}

const Dialog = ({ isDialogShow, setIsDialogShow, children }: Props) => {
  const [isMount, setIsMount] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDialogShow) {
      setIsMount(true);
      setTimeout(() => setIsOpen(true), 30);
    } else {
      setIsOpen(false);
      setTimeout(() => setIsMount(false), 300);
    }
  }, [isDialogShow]);

  return (
    <Scrim isOpen={isOpen} isMount={isMount} setIsModalShow={setIsDialogShow}>
      <Layout onClick={(event) => event.stopPropagation()}>{children}</Layout>
    </Scrim>
  );
};

export default Dialog;

const Layout = styled.section`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);


  // 추후 수정: 디자인 작업 중
`;
