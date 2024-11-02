/*
Dialog 컴포넌트 사용법
*/

import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { dialogState } from '@src/states/atoms';
import Scrim from '@src/components/common/Scrim';
import useDialog from '@src/hooks/useDialog';

const Dialog = () => {
  const { isOpen, transition, content } = useRecoilValue(dialogState);
  const { closeDialog } = useDialog();

  return (
    <Scrim isOpen={isOpen} transition={transition} closeModal={closeDialog}>
      <Layout
        $transition={transition}
        onClick={(event) => event.stopPropagation()}
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
  transform: translate(
    -50%,
    ${({ $transition }) => ($transition === 'open' ? '-50%' : '-20%')}
  );

  transition: transform 0.3s ease;

  // 추후 수정: 디자인 작업 중
`;
