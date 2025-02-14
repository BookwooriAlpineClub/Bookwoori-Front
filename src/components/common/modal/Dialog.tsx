import type Modal from '@src/types/modal';
import { useRecoilValue } from 'recoil';
import useModal from '@src/hooks/useModal';
import { dialogState } from '@src/states/atoms';
import styled from 'styled-components';
import Scrim from '@src/components/common/modal/Scrim';

/**
 * 컴포넌트 사용법
 *
 * 1. useModal 훅과 dialogState를 불러온다.
 * 2. useModal 훅에 dialogState를 넘기고 openModal과 closeModal을 가져온다.
 * 3. openModal()로 열고, closeModal()로 닫는다.
 *
 * @example
 *
 * import useModal from '@src/hooks/useModal';
 * import { dialogState } from '@src/states/atoms';
 *
 * const { openModal: openDialog, closeModal: closeDialog } = useModal(dialogState);
 *
 * const ConfirmDialog: React.ReactNode = (
 *   <div>
 *     <button type='button' onClick={closeDialog}>취소</button>
 *     <button type='button' onClick={() => {action(); closeDialog();}}>확인</button>
 *   </div>
 * );
 *
 * openDialog(ConfirmDialog);
 */
const Dialog = () => {
  const { isOpen, transition, content } = useRecoilValue(dialogState);
  const { closeModal: closeDialog } = useModal(dialogState);

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

const Layout = styled.section<{ $transition: Modal['transition'] }>`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(${({ $transition }) => ($transition === 'open' ? '-50%' : '-20%')});

  transition: transform 0.3s ease;

  // 추후 수정: 디자인 작업 중
`;
