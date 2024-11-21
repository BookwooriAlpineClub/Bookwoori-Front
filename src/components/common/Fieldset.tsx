import styled from 'styled-components';

interface Props extends Pick<InputProps, 'title'> {
  children: React.ReactNode;
}

const Fieldset = ({ title, children }: Props) => {
  return (
    <fieldset name={title}>
      <Legend>{title}</Legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;

const Legend = styled.legend`
  margin-bottom: 0.63rem;

  color: ${({ theme }) => theme.colors.black100};
  ${({ theme }) => theme.fonts.body};
`;
