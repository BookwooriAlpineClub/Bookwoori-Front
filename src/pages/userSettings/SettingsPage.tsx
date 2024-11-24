import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useDialog from '@src/hooks/useDialog';
import useMember from '@src/hooks/query/useMember';
import Header from '@src/components/common/Header';
import UserProfile from '@src/components/userSettings/UserProfile';
import Spinner from '@src/components/common/Spinner';
import DeleteConfirmModal from '@src/components/common/DeleteConfirmModal';
import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';
import { ReactComponent as Flag } from '@src/assets/icons/flag.svg';
import { ReactComponent as Delete } from '@src/assets/icons/trash.svg';

const SettingsPage = () => {
  const navigate = useNavigate();
  const userId = 1;
  const { profileData, isSuccess, isLoading, isError, delAccount } =
    useMember(userId);
  const { openDialog, closeDialog } = useDialog();

  const handleDelete = delAccount.mutate;

  const buttonData = [
    {
      icon: <Edit width='20px' height='20px' />,
      label: '인물 정보 수정하기',
      onClick: () => navigate(ROUTE_PATH.settingProfile),
    },
    {
      icon: <Flag />,
      label: '지나온 길 보기',
      onClick: () => navigate(ROUTE_PATH.settingExp),
    },
    {
      icon: <Delete />,
      label: '계정 삭제하기',
      onClick: () =>
        openDialog(
          <DeleteConfirmModal
            closeDialog={closeDialog}
            onClickDelete={handleDelete}
          />,
        ),
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }

  return (
    <>
      <SHeader text='설정' headerType='hamburger' />
      <SLayout>
        <UserProfile data={isSuccess ? profileData : undefined} />
        <SContainer>
          {buttonData.map(({ icon, label, onClick }) => (
            <SButton key={label} type='button' onClick={onClick}>
              {icon}
              {label}
            </SButton>
          ))}
        </SContainer>
      </SLayout>
    </>
  );
};

export default SettingsPage;

const SHeader = styled(Header)`
  z-index: 1;
`;
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.875rem;

  padding: 1.875rem 1.25rem 3.0625rem;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  width: 100%;
`;

const SButton = styled.button`
  display: flex;
  gap: 0.625rem;

  width: 100%;
  padding: 1.0625rem 0.9375rem;

  border-radius: 6.1875rem;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
