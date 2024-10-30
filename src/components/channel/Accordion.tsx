import styled from 'styled-components';
import { ReactComponent as Down } from '@src/assets/icons/down_arrow.svg';
import React, { useState } from 'react';

type accordionProps = {
  text: string;
  children?: React.ReactNode;
};

const Accordion = ({ text, children }: accordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <SLayout>
      <SContainer>
        <SLabel>{text}</SLabel>
        <SButton onClick={() => setIsOpen(!isOpen)}>
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
  background-color: ${({ theme }) => theme.colors.white};
`;
const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SDown = styled(Down)<{ $open: boolean }>`
  fill: ${({ theme, $open }) =>
    $open ? `${theme.colors.black100}` : `${theme.colors.black200}`};
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0)')};
`;
