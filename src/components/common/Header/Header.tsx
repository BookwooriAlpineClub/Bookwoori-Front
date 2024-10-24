import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../../../assets/icons/icn_menu.svg';
import { ReactComponent as Back } from '../../../assets/icons/icn_left_arrow.svg';
import { ReactComponent as Users } from '../../../assets/icons/icn_users.svg';

interface headerProps {
  text: string;
  headerType: 'hamburger' | 'back' | 'server';
}

const Header = ({ text, headerType }: headerProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (headerType === 'back') {
      navigate(-1);
    }
  };

  return (
    <SHeader role='banner'>
      <SButton type='button' onClick={handleClick} aria-label={headerType}>
        {headerType === 'back' ? <Back /> : <Hamburger />}
      </SButton>
      <SLabel>{text}</SLabel>
      <SButton
        type='button'
        onClick={handleClick}
        disabled={headerType !== 'server'}
      >
        <Users />
      </SButton>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;

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
  &:disabled {
    visibility: hidden;
  }
`;
