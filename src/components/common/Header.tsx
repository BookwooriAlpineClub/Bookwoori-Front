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
    <Layout className={className}>
      {headerType === 'back' ? (
        <Button type='button' onClick={handleClick} aria-label={headerType}>
          <Back />
        </Button>
      ) : (
        <Button type='button' onClick={openServerbar} aria-label={headerType}>
          <Hamburger />
        </Button>
      )}
      <Serverbar />
      <Label>{text}</Label>
      {headerType === 'server' && (
        <Button type='button' onClick={openSideBar}>
          <Users />
        </Button>
      )}
    </Layout>
  );
};

export default Header;

const Layout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 100;

  width: 100%;
  height: 4.375rem;
  padding: 1.4375rem;

  background: ${({ theme }) => theme.colors.neutral0};
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ theme }) => theme.fonts.title}
  color: ${({ theme }) => theme.colors.neutral950};
  text-align: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
`;
