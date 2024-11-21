import styled from 'styled-components';

const SubButton = ({ children }: { children: React.ReactNode }) => {
  return <SButton>{children}</SButton>;
};

export default SubButton;

const SButton = styled.button`
  display: flex;
  padding: 0.5rem 0.9375rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  width: calc(100% - 30px);

  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.blue100};

  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.white};
`;
