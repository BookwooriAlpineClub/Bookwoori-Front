import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}

const Accordions = ({
  title = 'title',
  children,
  id = `accordion-${Math.random().toString(36).substr(2, 9)}`,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id ? `${id}-content` : 'panel1a-content'}
        id={id || 'panel1a-header'}
        onClick={handleToggle}
      >
        {typeof title === 'string' ? <Typography>{title}</Typography> : title}
      </AccordionSummary>
      <AccordionDetails isOpen={isOpen}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Accordions;

// Styled Components
const Accordion = styled(MuiAccordion)`
  &.MuiAccordion-root {
    position: relative;
    border-radius: 0.9375rem;
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  }

  &.Mui-expanded {
    min-height: unset;
    margin: 0;
  }
`;

const AccordionSummary = styled(MuiAccordionSummary)`
  &.MuiAccordionSummary-root {
    min-height: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
  }
`;

const AccordionDetails = styled(MuiAccordionDetails)<{ isOpen: boolean }>`
  position: absolute;
  z-index: 100;
  top: calc(100% + 0.325rem);
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: 0.9375rem;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
`;
