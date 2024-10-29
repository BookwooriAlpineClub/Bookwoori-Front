import styled from 'styled-components';
import { ReactComponent as Down } from '@src/assets/icons/down_arrow.svg';
import React from 'react';

type accordionProps = {
  text: string;
  state: string;
  children?: React.ReactNode;
};

const Accordion = ({ text, state, children }: accordionProps) => {
  return (
    <SLayout>
      <SContainer>
        <SLabel>{text}</SLabel>
        <SButton>
          <SDown $open={state === 'open'} />
        </SButton>
      </SContainer>
      {state === 'open' && children}
    </SLayout>
  );
};

export default Accordion;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0.9375rem;
  gap: 0.9375rem;

  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SLabel = styled.label`
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
