import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}
const Section = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.section`
  padding: ${({ theme }) => theme.padding[16]};

  border-radius: ${({ theme }) => theme.rounded[12]};
  background-color: ${({ theme }) => theme.colors.neutral0};

  &:not(:has(input:enabled, textarea:enabled, select:enabled)) {
    background-color: ${({ theme }) => theme.colors.neutral200};
  }
`;

export default Section;
