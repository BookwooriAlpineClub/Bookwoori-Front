import styled from 'styled-components';

interface buttonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ text = '내용', type, onClick, disabled }: buttonProps) => {
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

  width: 315px;
  padding: 15px 5px;

  border-radius: 15px;
  border: 1px solid var(--blue-200, #96b8ff);
  background: ${({ disabled }) =>
    disabled
      ? 'var(--blue-300, #eef2ff)'
      : 'var(--blue-100, #3660F9) !important'};

  color: ${({ disabled }) =>
    disabled ? 'var(--blue-200, #96b8ff)' : 'var(--white, #fff) !important'};
  text-align: center;
  // font-family: MaruBuri;
  // font-size: 14px;
  // font-weight: 700;
`;
