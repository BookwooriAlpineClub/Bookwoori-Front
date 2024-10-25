import styled from 'styled-components';
import { theme } from 'src/styles/theme';

interface buttonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  type = 'button',
  disabled = true,
  onClick,
  ...props
}: buttonProps) => {
  return (
    <SButton
      name='button'
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </SButton>
  );
};

export default Button;

const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 19.6875rem;
  padding: 0.9375rem 0.3125rem;

  border-radius: 0.9375rem;
  border: 1px solid ${theme.colors.blue200};
  background: ${theme.colors.blue100};

  color: ${theme.colors.white};
  text-align: center;

  &:disabled {
    background: ${theme.colors.blue300};
    color: ${theme.colors.blue200};
    cursor: default;
  }
`;
