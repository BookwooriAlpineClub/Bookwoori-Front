import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IcnBack } from '@src/assets/icons/ck_arrow_back.svg';
import { ReactComponent as IcnPencil } from '@src/assets/icons/hi_outline_pencil.svg';
import { ReactComponent as IcnTrash } from '@src/assets/icons/ai_outline_delete.svg';
import { ReactComponent as IcnSave } from '@src/assets/icons/fi_save.svg';

interface Props {
  buttonList: ('edit' | 'delete' | 'save')[];
  handleEditClick?: () => void;
  handleDeleteClick?: () => void;
}

const Header = ({ buttonList, handleEditClick, handleDeleteClick }: Props) => {
  const navigate = useNavigate();

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
      <Button onClick={() => navigate(-1)}>
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

  color: ${({ theme }) => theme.colors.neutral950};
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
`;
const Button = styled.button`
  display: flex;
`;
