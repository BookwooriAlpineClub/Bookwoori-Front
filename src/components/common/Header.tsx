import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useModal from '@src/hooks/useModal';
import Serverbar from '@src/components/common/Serverbar';
import { ReactComponent as Hamburger } from '@src/assets/icons/fi_menu.svg';
import { ReactComponent as Back } from '@src/assets/icons/fi_arrow_left.svg';
import { ReactComponent as Users } from '@src/assets/icons/fi_users.svg';

interface HeaderProps {
  text: string;
  headerType: 'hamburger' | 'back' | 'server';
  onClick?: () => void;
}

const renderButton = (type: string, onClick: () => void, Icon: React.FC) => (
  <Button type='button' onClick={onClick} aria-label={type}>
    <Icon />
  </Button>
);

const Header = ({ text, headerType, onClick }: HeaderProps) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  const { openModal: openServerbar } = useModal('serverbar');
  const { openModal: openSideBar } = useModal('sidebar');

  return (
    <Layout>
      {headerType === 'back' &&
        renderButton('back', onClick ?? handleClick, Back)}
      {(headerType === 'hamburger' || headerType === 'server') &&
        renderButton('hamburger', openServerbar, Hamburger)}
      <Serverbar />
      <Label>{text}</Label>
      {headerType === 'server' && renderButton('server', openSideBar, Users)}
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
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.header};

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
