import styled from 'styled-components';

interface Props {
  children: string;
}

const Tag = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default Tag;

const Container = styled.mark`
  width: fit-content;
  height: fit-content;
  padding: 0.25rem 0.625rem;

  border-radius: 6.1875rem;
  border: 1px solid ${({ theme }) => theme.colors.blue100};
  background-color: ${({ theme }) => theme.colors.blue300};

  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.blue100};
`;
