import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <SButton name='button' {...props}>
      {children}
    </SButton>
  );
};

export default Button;

const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0.9375rem 0.3125rem;

  border-radius: 0.9375rem;
  border: ${({ theme }) => `1px solid ${theme.colors.blue300}`};
  background: ${({ theme }) => theme.colors.blue500};

  color: ${({ theme }) => theme.colors.neutral0};
  text-align: center;

  &:disabled {
    background: ${({ theme }) => theme.colors.blue100};
    color: ${({ theme }) => theme.colors.blue300};
    cursor: default;
  }
`;
