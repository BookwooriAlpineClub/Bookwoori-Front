import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Chip = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Chip;

const Wrapper = styled.mark`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.125rem;

  padding: 0.125rem 0.5rem 0.125rem 0.375rem;

  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.colors.blue300};

  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.blue100};
`;
