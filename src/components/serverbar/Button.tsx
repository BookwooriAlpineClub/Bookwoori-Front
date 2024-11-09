import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  children: React.ReactElement;
}

const Button = ({ children }: Props) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('#');
    // 서버바 닫기
  }, []);

  return <BtnLayout onClick={handleClick}>{children}</BtnLayout>;
};

export default Button;

const BtnLayout = styled.input.attrs({ type: 'radio' })`
  width: 3.125rem;
  height: 3.125rem;

  border-radius: 50%;

  &:checked {
    border-radius: 20px;
  }
`;
