import styled from 'styled-components';
import { ReactComponent as Down } from '@src/assets/icons/down_arrow.svg';
import React, { useState } from 'react';

type AccordionProps = {
  id?: number;
  text: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, idx: number) => void;
  onDrop?: (idx: number) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  // onTouchStart?: (e: React.TouchEvent, idx: number) => void;
  // onTouchEnd?: (e: React.TouchEvent, idx: number) => void;
  // onTouchMove?: (e: React.TouchEvent) => void;
  children?: React.ReactNode;
};

const Accordion = ({
  id = -1,
  text,
  draggable = false,
  onDragStart = () => {},
  onDrop = () => {},
  onDragOver = () => {},
  // onTouchStart = () => {},
  // onTouchEnd = () => {},
  // onTouchMove = () => {},
  children,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!children);
  const isTouchDevice = 'ontouchstart' in window;

  return (
    <SLayout
      draggable={!isTouchDevice && draggable}
      onDragStart={(e) => onDragStart(e, id)}
      onDrop={() => onDrop(id)}
      onDragOver={onDragOver}
      // onTouchStart={(e) => onTouchStart(e, id)}
      // onTouchEnd={(e) => onTouchEnd(e, id)}
      // onTouchMove={onTouchMove}
    >
      <SContainer>
        <SLabel>{text}</SLabel>
        <SButton
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={!children}
        >
          <SDown $open={isOpen} />
        </SButton>
      </SContainer>
      {isOpen && children}
    </SLayout>
  );
};

export default Accordion;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.9375rem;
  gap: 0.9375rem;

  width: 100%;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  cursor: pointer;
`;
const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
`;
const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SDown = styled(Down)<{ $open: boolean }>`
  fill: ${({ theme, $open }) =>
    $open ? `${theme.colors.neutral950}` : `${theme.colors.neutral400}`};
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0)')};
`;
