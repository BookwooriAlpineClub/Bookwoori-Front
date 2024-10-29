import styled from 'styled-components';
import Header from '@src/components/common/Header';
import UserProfile from '@src/components/userSettings/UserProfile';
import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';
import { ReactComponent as Flag } from '@src/assets/icons/flag.svg';
import { ReactComponent as Delete } from '@src/assets/icons/trash.svg';

const SettingsPage = () => {
  const buttonData = [
    { icon: <Edit />, label: '인물 정보 수정하기' },
    { icon: <Flag />, label: '지나온 길 보기' },
    { icon: <Delete />, label: '계정 삭제하기' },
  ];

  return (
    <>
      <Header text='설정' headerType='hamburger' />
      <SLayout>
        <UserProfile />
        <SContainer>
          {buttonData.map((button) => (
            <SButton key={button.label} type='button'>
              {button.icon}
              {button.label}
            </SButton>
          ))}
        </SContainer>
      </SLayout>
    </>
  );
};

export default SettingsPage;

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
