import type Modal from '@src/types/modal';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  transition: Modal['transition'];
  closeModal: () => void;
  children: React.ReactNode;
}

const Scrim = ({ isOpen, transition, closeModal, children }: Props) => {
  return createPortal(
    isOpen && (
      <Background
        aria-label='scrim'
        onClick={closeModal}
        $transition={transition}
      >
        {children}
      </Background>
    ),
    document.getElementById('modal') as HTMLElement,
  );
};

export default Scrim;

const Background = styled.div<{ $transition: Modal['transition'] }>`
  opacity: ${({ $transition }) => ($transition === 'open' ? 1 : 0)};

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.overlay};

  transition: opacity 0.3s ease;
`;
