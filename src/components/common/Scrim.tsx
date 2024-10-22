import styled from 'styled-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  isMount: boolean;
  setIsModalShow(isModalShow: boolean): void;
  children: React.ReactNode;
}

const Scrim = ({ isOpen, isMount, setIsModalShow, children }: Props) => {
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
    <div>
      {isMount && (
        <Background $isOpen={isOpen} onClick={() => setIsModalShow(false)}>
          {children}
        </Background>
      )}
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default Scrim;

const Background = styled.div<{ $isOpen: boolean }>`
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
