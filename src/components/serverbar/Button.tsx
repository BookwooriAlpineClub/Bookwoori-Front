import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  link: string;
  checked: boolean;
  className?: string;
  children?: React.ReactElement;
}

const Button = ({ link, checked, className, children }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
    // 서버바 닫기
  };

  return (
    <BtnLayout className={className} onClick={handleClick}>
      <input
        type='radio'
        name='serverbar'
        onChange={() => setIsChecked(true)}
        checked={isChecked}
      />
      {children}
    </BtnLayout>
  );
};

export default Button;

const BtnLayout = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.125rem;
  height: 3.125rem;

  border-radius: 50%;

  &:has(input[type='radio']:checked) {
    border-radius: 20px;
  }

  &.neongreen {
    background-color: ${({ theme }) => theme.colors.black300};
    color: ${({ theme }) => theme.colors.black200};

    &:has(input[type='radio']:checked) {
      background-color: ${({ theme }) => theme.colors.neonGreen};
      color: ${({ theme }) => theme.colors.black100};
    }
  }

  &.new {
    position: relative;

    &::after {
      position: absolute;
      top: 0;
      right: 0;

      width: 0.5rem;
      height: 0.5rem;

      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.blue100};
    }
  }

  &.blue {
    background-color: ${({ theme }) => theme.colors.blue200};
    color: ${({ theme }) => theme.colors.white};
  }
`;
