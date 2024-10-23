import styled from 'styled-components';

interface buttonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ text, type, onClick, disabled }: buttonProps) => {
  return (
    <SButton name='button' type={type} onClick={onClick} disabled={disabled}>
      {text}
    </SButton>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
  disabled: true,
  onClick: () => {},
};

// 색상 추후 수정
const SButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 19.6875rem;
  padding: 0.9375rem 0.3125rem;

  border-radius: 15px;
  border: 1px solid var(--blue-200, #96b8ff);
  background: var(--blue-100, #3660f9);

  color: var(--white, #fff);
  text-align: center;
  // font-family: MaruBuri;
  // font-size: 14px;
  // font-weight: 700;

  &:disabled {
    background: var(--blue-300, #eef2ff);
    color: var(--blue-200, #96b8ff);
    cursor: default;
  }
`;
