import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Down } from '@src/assets/icons/hi_outline_chevron_down.svg';

/**
 * title - 아코디언이 접혀있을 때 보여줄 내용을 넣어주세요.
 * children - 아코디언을 펼쳤을 때 title 하단에 보여줄 내용을 넣어주세요.
 */

type AccordionProps = {
  dataIdx?: number;
  title: React.ReactNode;
  children?: React.ReactNode;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onTouchMove?: (e: React.TouchEvent) => void;
};

const Accordion = ({
  dataIdx,
  title,
  children,
  draggable = false,
  onDragStart = () => {},
  onDrop = () => {},
  onDragOver = () => {},
  onTouchStart = () => {},
  onTouchEnd = () => {},
  onTouchMove = () => {},
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
      data-idx={dataIdx}
      draggable={!isTouchDevice && draggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
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
  touch-action: none;
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
