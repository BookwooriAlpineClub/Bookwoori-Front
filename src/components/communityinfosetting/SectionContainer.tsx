import React from 'react';
import styled from 'styled-components';

interface SectionContainerProps {
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};
export default SectionContainer;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
`;
