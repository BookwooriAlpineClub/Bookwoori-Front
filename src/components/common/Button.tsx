import styled from 'styled-components';

interface buttonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  form?: string;
}

const Button = ({
  children,
  type = 'button',
  disabled = true,
  onClick,
  form,
  ...props
}: buttonProps) => {
  return (
    <SButton
      name='button'
      type={type}
      onClick={onClick}
      disabled={disabled}
      form={form}
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
  border: ${({ theme }) => `1px solid ${theme.colors.blue200}`};
  background: ${({ theme }) => theme.colors.blue100};

  color: ${({ theme }) => theme.colors.white};
  text-align: center;

  &:disabled {
    background: ${({ theme }) => theme.colors.blue300};
    color: ${({ theme }) => theme.colors.blue200};
    cursor: default;
  }
`;
