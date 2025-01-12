import styled from 'styled-components';

interface Props {
  as?: 'fieldset' | 'section';
  title: string;
  children: React.ReactNode;
}

const Fieldset = ({ as = 'fieldset', title, children }: Props) => {
  const Container = as;

  return (
    <Container name={title}>
      <Title as={as === 'fieldset' ? 'legend' : 'h3'}>{title}</Title>
      {children}
    </Container>
  );
};

export default Fieldset;

const Title = styled.legend`
  margin-bottom: ${({ theme }) => theme.gap[10]};

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
`;
