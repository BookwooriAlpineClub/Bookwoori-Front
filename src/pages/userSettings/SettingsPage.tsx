import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useModal from '@src/hooks/useModal';
import { useDeleteAccount } from '@src/hooks/query/auth';
import { dialogState } from '@src/states/atoms';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import UserProfile from '@src/components/common/UserProfile';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';
import IconButton from '@src/components/common/button/IconButton';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { delAccount } = useDeleteAccount();
  const { openModal: openDialog, closeModal: closeDialog } = useModal(dialogState);

  const handleDelete = () => {
    delAccount.mutate();
  };

  return (
    <>
      <Header text='설정' headerType='hamburger' />
      <Main>
        <UserProfile memberId='me' />
        <Container>
          <IconButton
            type='editUserInfo'
            onClick={() => navigate(ROUTE_PATH.settingProfile)}
          />
          <IconButton
            type='navigateExp'
            onClick={() => navigate(ROUTE_PATH.settingExp)}
          />
          <IconButton
            type='deleteAccount'
            onClick={() =>
              openDialog(
                <DeleteConfirmDialog
                  closeDialog={closeDialog}
                  onClickDelete={handleDelete}
                />,
              )
            }
          />
        </Container>
      </Main>
    </>
  );
};

export default SettingsPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.875rem;

  padding: 1.875rem 1.25rem 3.0625rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[10]};

  width: 100%;
`;
