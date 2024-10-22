import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../../../assets/icons/icn_menu.svg';
import { ReactComponent as Back } from '../../../assets/icons/icn_left_arrow.svg';
import { ReactComponent as Users } from '../../../assets/icons/icn_users.svg';

interface headerProps {
  text: string;
  type: 'hamburger' | 'back' | 'server';
}

const Header = ({ text, type }: headerProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === 'back') {
      navigate(-1);
    }
  };

  return (
    <SHeader role='banner'>
      <SButton
        type='button'
        onClick={handleClick}
        aria-label={type === 'back' ? 'back' : 'hamburger'}
      >
        {type === 'hamburger' || type === 'server' ? <Hamburger /> : <Back />}
      </SButton>
      <SLabel>{text}</SLabel>
      <SButton type='button' onClick={handleClick}>
        {type === 'server' && <Users data-testid='users-icon' />}
      </SButton>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 999;

  width: 100%;
  height: 4.375rem;
  padding: 0 1.4375rem;

  background: var(--white, #fff);
`;

const SLabel = styled.label`
  text-align: center;
  color: var(--black-100, #0f1015);
  // font-family: 'HS여름물빛체 2.0';
  font-size: 15px;
  font-weight: 400;
  // line-height: 16px;
  // letter-spacing: 0.3px;
`;

const SButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
`;
