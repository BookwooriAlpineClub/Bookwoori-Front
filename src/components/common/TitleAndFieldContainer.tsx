import React from 'react';
import styled from 'styled-components';

interface InputGroupContainerProps {
  title: string;
  children: React.ReactNode;
}

const TitleAndFieldContainer = ({
  title,
  children,
}: InputGroupContainerProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default TitleAndFieldContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  width: 100%;
`;

const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
