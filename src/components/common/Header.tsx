import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useSideBar from '@src/hooks/useSideBar';
import useServerbar from '@src/hooks/useServerbar';
import { ReactComponent as Hamburger } from '@src/assets/icons/menu.svg';
import { ReactComponent as Back } from '@src/assets/icons/left_arrow.svg';
import { ReactComponent as Users } from '@src/assets/icons/users.svg';
import Serverbar from '@src/components/common/Serverbar';

interface headerProps {
  className?: string;
  text: string;
  headerType: 'hamburger' | 'back' | 'server';
}

const Header = ({ className, text, headerType }: headerProps) => {
  const navigate = useNavigate();
  const { openSideBar } = useSideBar();
  const { openServerbar } = useServerbar();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <SHeader className={className}>
      {headerType === 'back' ? (
        <SButton type='button' onClick={handleClick} aria-label={headerType}>
          <Back />
        </SButton>
      ) : (
        <SButton type='button' onClick={openServerbar} aria-label={headerType}>
          <Hamburger />
        </SButton>
      )}
      <Serverbar />
      <SLabel>{text}</SLabel>
      {headerType === 'server' && (
        <SButton type='button' onClick={openSideBar}>
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
  color: ${({ theme }) => theme.colors.black100};
  text-align: center;
`;

const SButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
`;
