import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import usePermission from '@src/hooks/usePermission';
import useDialog from '@src/hooks/useDialog';
import {
  useGetDevice,
  usePostDevice,
  useDeleteDevice,
} from '@src/hooks/query/useNotification';
import useMember from '@src/hooks/query/useMember';
import Header from '@src/components/common/Header';
import IconButton from '@src/components/common/IconButton';
import UserProfile from '@src/components/common/UserProfile';
import DeleteConfirmModal from '@src/components/common/DeleteConfirmModal';
import { useQueryClient } from '@tanstack/react-query';

const SettingsPage = () => {
  const navigate = useNavigate();
  const requestNotification = usePermission();
  const { openDialog, closeDialog } = useDialog();
  const queryClient = useQueryClient();
  const device = useGetDevice();
  const createDevice = usePostDevice();
  const deleteDevice = useDeleteDevice();
  const { delAccount } = useMember();

  const handleNotificationOn = async () => {
    const currentToken = await requestNotification();
    createDevice.mutate(
      {
        body: {
          platform: 'WEB',
          token: currentToken,
        },
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ['getDevice'] });
        },
      },
    );
  };
  const handleNotificationOff = () => {
    deleteDevice.mutate(undefined, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['getDevice'] });
      },
    });
  };
  const handleAccountDelete = () => {
    delAccount.mutate();
  };

  return (
    <>
      <Header text='설정' headerType='hamburger' />
      <Layout>
        <UserProfile />
        <Container>
          <IconButton
            type='editUserInfo'
            onClick={() => navigate(ROUTE_PATH.settingProfile)}
          />
          {device ? (
            <IconButton
              type='notificationTurnOff'
              onClick={handleNotificationOff}
            />
          ) : (
            <IconButton
              type='notificationTurnOn'
              onClick={handleNotificationOn}
            />
          )}
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
                  onClickDelete={handleAccountDelete}
                />,
              )
            }
          />
        </Container>
      </Layout>
    </>
  );
};

export default SettingsPage;

const Layout = styled.div`
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
  gap: 0.625rem;

  width: 100%;
`;
