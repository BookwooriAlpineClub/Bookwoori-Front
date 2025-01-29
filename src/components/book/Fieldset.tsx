import styled from 'styled-components';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Fieldset = ({ title, children }: Props) => {
  return (
    <Container>
      <Legend>{title}</Legend>
      {children}
    </Container>
  );
};

export default Fieldset;

const Container = styled.fieldset`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.625rem;

  padding: ${({ theme }) => theme.padding[16]};

  border-radius: ${({ theme }) => theme.rounded[16]};
  background-color: ${({ theme }) => theme.colors.neutral50};
`;
const Legend = styled.legend`
  display: contents;

  ${({ theme }) => theme.fonts.mountain}
`;
