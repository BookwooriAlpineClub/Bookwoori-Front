import { useNavigate } from 'react-router-dom';
// import { useQueryClient } from '@tanstack/react-query';
import { ROUTE_PATH } from '@src/constants/routePath';
import useModal from '@src/hooks/useModal';
import usePermission from '@src/hooks/usePermission';
// import {
//   useGetDevice,
//   usePostDevice,
//   useDeleteDevice,
// } from '@src/hooks/query/device';
import { useDeleteAccount } from '@src/hooks/query/auth';
import { dialogState } from '@src/states/atoms';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import UserProfile from '@src/components/common/UserProfile';
import IconButton from '@src/components/common/button/IconButton';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';

const SettingsPage = () => {
  // const queryClient = useQueryClient();
  // const { data: device } = useGetDevice();

  const navigate = useNavigate();
  const requestNotification = usePermission();
  // const { mutate: createDevice } = usePostDevice();
  // const { mutate: deleteDevice } = useDeleteDevice();
  const { delAccount } = useDeleteAccount();
  const { openModal: openDialog, closeModal: closeDialog } =
    useModal(dialogState);

  const handleNotificationOn = async () => {
    const currentToken = await requestNotification();
    console.log(currentToken);
    // createDevice(currentToken, {
    //   onSuccess() {
    //     queryClient.invalidateQueries({ queryKey: ['getDevice'] });
    //   },
    // });
  };
  // const handleNotificationOff = () => {
  //   deleteDevice(undefined, {
  //     onSuccess() {
  //       queryClient.invalidateQueries({ queryKey: ['getDevice'] });
  //     },
  //   });
  // };
  const handleAccountDelete = () => {
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
          {/* {device.result.token ? (
            <IconButton
              type='notificationTurnOff'
              onClick={handleNotificationOff}
            />
          ) : ( */}
          <IconButton
            type='notificationTurnOn'
            onClick={handleNotificationOn}
          />
          {/* )} */}
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
                  onClickDelete={handleAccountDelete}
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
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[10]};

  width: 100%;
`;
