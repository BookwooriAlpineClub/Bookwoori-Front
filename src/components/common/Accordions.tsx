import React from 'react';
import styled from 'styled-components';
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
}

const Accordions = ({
  title = 'title',
  children,
  icon = <ExpandMoreIcon />,
  id = `accordion-${Math.random().toString(36).substr(2, 9)}`,
}: AccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={icon || <ExpandMoreIcon />}
        aria-controls={id ? `${id}-content` : 'panel1a-content'}
        id={id || 'panel1a-header'}
      >
        {typeof title === 'string' ? <Typography>{title}</Typography> : title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Accordions;

const Accordion = styled(MuiAccordion)`
  &.MuiAccordion-root {
    border-radius: 0.9375rem;
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
  }
`;
