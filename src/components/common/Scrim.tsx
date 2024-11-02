import styled from 'styled-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  transition: ModalTransition;
  closeModal: () => void;
  children: React.ReactNode;
}

const Scrim = ({ isOpen, transition, closeModal, children }: Props) => {
  useEffect(() => {
    // 스크롤 방지
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;
    `;
    return () => {
      // 스크롤 복원
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return createPortal(
    isOpen && (
      <Background $transition={transition} onClick={closeModal}>
        {children}
      </Background>
    ),
    document.getElementById('modal') as HTMLElement,
  );
};

export default Scrim;

const Background = styled.div<{ $transition: ModalTransition }>`
  opacity: ${({ $transition }) => ($transition === 'open' ? 1 : 0)};

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.blackOverlay};

  transition: opacity 0.3s ease;
`;
