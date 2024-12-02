import { ROUTE_PATH } from '@src/constants/routePath';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IcnBack } from '@src/assets/icons/ck_arrow_back.svg';
import { ReactComponent as IcnPencil } from '@src/assets/icons/edit.svg';
import { ReactComponent as IcnTrash } from '@src/assets/icons/ai_outline_delete.svg';
import { ReactComponent as IcnSave } from '@src/assets/icons/fi_save.svg';

interface Props {
  buttonList: ('edit' | 'delete' | 'save')[];
}

const Header = ({ buttonList }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleEditClick = () => {
    navigate(`${location.pathname}/edit`);
  };
  const handleDeleteClick = () => {
    // 나중에 "삭제하시겠습니까?" 다이얼로그 띄우기
    // API delete 요청
    navigate(ROUTE_PATH.libraryRecord, { replace: true });
  };

  const buttonConfig: {
    [key: string]: {
      Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
      type: 'button' | 'submit' | 'reset';
      onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    };
  } = {
    edit: { Icon: IcnPencil, type: 'button', onClick: handleEditClick },
    delete: { Icon: IcnTrash, type: 'button', onClick: handleDeleteClick },
    save: { Icon: IcnSave, type: 'submit', onClick: undefined },
  };

  return (
    <Container>
      <Button onClick={handleBackClick}>
        <IcnBack width={20} height={20} />
      </Button>
      <ButtonWrapper>
        {buttonList.map((item) => {
          const { Icon, type, onClick } = buttonConfig[item];
          return (
            <Button key={item} type={type} onClick={onClick}>
              <Icon width={20} height={20} />
            </Button>
          );
        })}
      </ButtonWrapper>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.black100};
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
`;
const Button = styled.button`
  display: flex;
`;
