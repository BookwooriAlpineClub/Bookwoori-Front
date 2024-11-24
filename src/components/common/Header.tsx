import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Hamburger } from '@src/assets/icons/menu.svg';
import { ReactComponent as Back } from '@src/assets/icons/left_arrow.svg';
import { ReactComponent as Users } from '@src/assets/icons/users.svg';

interface headerProps {
  className?: string;
  text: string;
  headerType: 'hamburger' | 'back' | 'server';
}

const Header = ({ className, text, headerType }: headerProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (headerType === 'back') {
      navigate(-1);
    }
  };

  return (
    <SHeader className={className}>
      <SButton type='button' onClick={handleClick} aria-label={headerType}>
        {headerType === 'back' ? <Back /> : <Hamburger />}
      </SButton>
      <SLabel>{text}</SLabel>
      {headerType === 'server' && (
        <SButton type='button' onClick={handleClick}>
          <Users />
        </SButton>
      )}
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
  padding: 1.4375rem;

  background: ${({ theme }) => theme.colors.white};
`;

const SLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ theme }) => theme.fonts.title}
  color:  ${({ theme }) => theme.colors.black100};
  text-align: center;
`;

const SButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
`;
