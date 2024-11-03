import styled from 'styled-components';

interface Props extends Pick<InputProps, 'title'> {
  children: React.ReactNode;
}

const Fieldset = ({ title, children }: Props) => {
  return (
    <fieldset name={title}>
      <Legend>{title}</Legend>
      <Container>{children}</Container>
    </fieldset>
  );
};

export default Fieldset;

const Legend = styled.legend`
  margin-bottom: 0.63rem;

  color: ${({ theme }) => theme.colors.black100};
  ${({ theme }) => theme.fonts.body};
`;
const Container = styled.div`
  position: relative;

  width: 100%;
  padding: 0.9375rem;

  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
