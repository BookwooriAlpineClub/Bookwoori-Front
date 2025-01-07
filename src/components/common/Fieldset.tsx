import styled from 'styled-components';

interface Props {
  title: string;
  children: React.ReactNode;
  isDisabled?: boolean;
}

const Fieldset = ({ title, children, isDisabled = false }: Props) => {
  return (
    <fieldset name={title}>
      <Legend>{title}</Legend>
      <Container isDisabled={isDisabled}>{children}</Container>
    </fieldset>
  );
};

export default Fieldset;

const Legend = styled.legend`
  margin-bottom: 0.63rem;

  color: ${({ theme }) => theme.colors.black100};
  ${({ theme }) => theme.fonts.body};
`;
const Container = styled.div<{ isDisabled: boolean }>`
  position: relative;

  padding: 0.9375rem;
  width: 100%;

  border-radius: 0.9375rem;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.black400 : theme.colors.white}};
`;
