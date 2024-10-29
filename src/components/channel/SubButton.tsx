import styled from 'styled-components';

const SubButton = ({ children }: { children: React.ReactNode }) => {
  return <SButton>{children}</SButton>;
};

export default SubButton;

const SButton = styled.button`
  display: flex;
  padding: 8px 15px;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  width: calc(100% - 30px);

  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.blue100};

  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.white};
`;
