import styled from 'styled-components';

interface Props {
  title: string;
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
  margin-bottom: ${({ theme }) => theme.gap.10};

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
`;
