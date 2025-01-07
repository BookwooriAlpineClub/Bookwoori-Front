/*
Bottomsheet 컴포넌트 사용법

1. useBottomsheet 훅을 불러온다.
import useBottomsheet from '@src/hooks/useBottomsheet';
const { openBottomsheet, closeBottomsheet } = useBottomsheet();

2. openBottomsheet()로 열고, closeBottomsheet()로 닫는다.
const ConfirmBottomsheet: React.ReactNode = (
  <div>
    <button type='button' onClick={closeBottomsheet}>취소</button>
    <button type='button' onClick={() => {action(); closeBottomsheet();}}>확인</button>
  </div>
);
openBottomsheet(ConfirmBottomsheet);
*/

import type { ModalTransition } from '@src/types/modal';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { bottomsheetState } from '@src/states/atoms';
import useBottomsheet from '@src/hooks/useBottomsheet';
import Scrim from '@src/components/common/Scrim';

const Bottomsheet = () => {
  const { isOpen, transition, content } = useRecoilValue(bottomsheetState);
  const { closeBottomsheet } = useBottomsheet();

  return (
    <Scrim
      isOpen={isOpen}
      transition={transition}
      closeModal={closeBottomsheet}
    >
      <Layout
        aria-label='bottomsheet'
        onClick={(event) => event.stopPropagation()}
        $transition={transition}
      >
        <HandleBar aria-label='handle-bar' />
        {content}
      </Layout>
    </Scrim>
  );
};

export default Bottomsheet;

const Layout = styled.section<{ $transition: ModalTransition }>`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) translateY(${({ $transition }) => ($transition === 'open' ? 0 : '100%')});

  width: 100%;
  max-width: 500px;
  max-height: 100%;

  border-radius: 1.875rem 1.875rem 0rem 0rem;
  background-color: ${({ theme }) => theme.colors.black300};

  transition: transform 0.3s ease;
`;
const HandleBar = styled.button`
  position: absolute;
  top: 0.625rem;
  left: 50%;
  transform: translateX(-50%);

  width: 1.875rem;
  height: 0.1875rem;

  border-radius: 6.1875rem;
  background-color: ${({ theme }) => theme.colors.blue200};
`;
