/*
Dialog 컴포넌트 사용법

1. useDialog 훅을 불러온다.
import useDialog from '@src/hooks/useDialog';
const { openDialog, closeDialog } = useDialog();

2. openDialog()로 열고, closeDialog()로 닫는다.
const ConfirmDialog: React.ReactNode = (
  <div>
    <button type='button' onClick={closeDialog}>취소</button>
    <button type='button' onClick={() => {action(); closeDialog();}}>확인</button>
  </div>
);
openDialog(ConfirmDialog);
*/

import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { dialogState } from '@src/states/atoms';
import useDialog from '@src/hooks/useDialog';
import Scrim from '@src/components/common/Scrim';

const Dialog = () => {
  const { isOpen, transition, content } = useRecoilValue(dialogState);
  const { closeDialog } = useDialog();

  return (
    <Scrim isOpen={isOpen} transition={transition} closeModal={closeDialog}>
      <Layout
        role='dialog'
        onClick={(event) => event.stopPropagation()}
        $transition={transition}
      >
        {content}
      </Layout>
    </Scrim>
  );
};

export default Dialog;

const Layout = styled.section<{ $transition: ModalTransition }>`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(${({ $transition }) => ($transition === 'open' ? '-50%' : '-20%')});

  transition: transform 0.3s ease;

  // 추후 수정: 디자인 작업 중
`;
