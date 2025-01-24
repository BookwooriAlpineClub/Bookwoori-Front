import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useDialog from '@src/hooks/useDialog';
import { useDeleteAccount } from '@src/hooks/query/auth';
import Header from '@src/components/common/Header';
import IconButton from '@src/components/common/IconButton';
import UserProfile from '@src/components/common/UserProfile';
import DeleteConfirmModal from '@src/components/common/DeleteConfirmModal';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { delAccount } = useDeleteAccount();
  const { openDialog, closeDialog } = useDialog();

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
                <DeleteConfirmModal
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
