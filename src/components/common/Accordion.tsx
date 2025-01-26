import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Down } from '@src/assets/icons/hi_outline_chevron_down.svg';

/**
 * title - 아코디언이 접혀있을 때 보여줄 내용을 넣어주세요.
 * children - 아코디언을 펼쳤을 때 title 하단에 보여줄 내용을 넣어주세요.
 */

type AccordionProps = {
  id?: number;
  title: React.ReactNode;
  children?: React.ReactNode;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, idx: number) => void;
  onDrop?: (idx: number) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  // onTouchStart?: (e: React.TouchEvent, idx: number) => void;
  // onTouchEnd?: (e: React.TouchEvent, idx: number) => void;
  // onTouchMove?: (e: React.TouchEvent) => void;
};

const Accordion = ({
  id = -1,
  title,
  children,
  draggable = false,
  onDragStart = () => {},
  onDrop = () => {},
  onDragOver = () => {},
  // onTouchStart = () => {},
  // onTouchEnd = () => {},
  // onTouchMove = () => {},
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!children);
  const isTouchDevice = 'ontouchstart' in window;
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current && children) {
      setIsOpen(true);
      isInitialRender.current = false;
    }
  }, [children]);

  return (
    <Layout
      draggable={!isTouchDevice && draggable}
      onDragStart={(e) => onDragStart(e, id)}
      onDrop={() => onDrop(id)}
      onDragOver={onDragOver}
      // onTouchStart={(e) => onTouchStart(e, id)}
      // onTouchEnd={(e) => onTouchEnd(e, id)}
      // onTouchMove={onTouchMove}
    >
      <Container>
        {title}
        <Button onClick={() => setIsOpen((prev) => !prev)} disabled={!children}>
          <SDown $open={isOpen} />
        </Button>
      </Container>
      {isOpen && children}
    </Layout>
  );
};

export default Accordion;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.9375rem;
  gap: 0.9375rem;

  width: 100%;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SDown = styled(Down)<{ $open: boolean }>`
  fill: ${({ theme, $open }) =>
    $open ? `${theme.colors.neutral950}` : `${theme.colors.neutral400}`};
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0)')};
`;
