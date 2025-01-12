import React from 'react';
import styled from 'styled-components';
import { ReactComponent as BiCrown } from '@src/assets/icons/bi_crown.svg';
import { ReactComponent as FiTrash } from '@src/assets/icons/fi_trash_2.svg';
import { ReactComponent as FiLogOut } from '@src/assets/icons/fi_log_out.svg';
import { ReactComponent as BIUserPlus } from '@src/assets/icons/bi_user_plus.svg';
import { ReactComponent as FiSettings } from '@src/assets/icons/fi_settings.svg';
import { ReactComponent as HiOutlinePencil } from '@src/assets/icons/hi_outline_pencil.svg';
import { ReactComponent as HiOutlineFlag } from '@src/assets/icons/hi_outline_flag.svg';

type SettingType = 'transferAuthority' | 'deleteCommunity' | 'leaveCommunity';

type FunctionType = 'copyInvitation' | 'detailInfoSetting';

type UserSettingType = 'editUserInfo' | 'navigateExp' | 'deleteAccount';

export type IconButtonType = SettingType | FunctionType | UserSettingType;

interface IconButtonProps {
  type: IconButtonType;
  onClick?: () => void; // 이벤트가 발생하지 않는 버튼 대비 optional 처리
  testId?: string; // 테스트를 하지 않는 버튼 대비 optional 처리
}

const buttonConfig = {
  transferAuthority: {
    name: '공동체 권한 넘기기',
    icon: <BiCrown />,
  },
  deleteCommunity: {
    name: '공동체 삭제하기',
    icon: <FiTrash />,
  },
  leaveCommunity: {
    name: '공동체 나가기',
    icon: <FiLogOut />,
  },
  copyInvitation: {
    name: '공동체 초대장 복사하기',
    icon: <BIUserPlus />,
  },
  detailInfoSetting: {
    name: '공동체 정보 및 설정 보기',
    icon: <FiSettings />,
  },
  editUserInfo: {
    name: '인물 정보 수정하기',
    icon: <HiOutlinePencil />,
  },
  navigateExp: {
    name: '지나온 길 보기',
    icon: <HiOutlineFlag />,
  },
  deleteAccount: {
    name: '계정 삭제하기',
    icon: <FiTrash />,
  },
};

const IconButton: React.FC<IconButtonProps> = ({ type, onClick, testId }) => {
  const { name, icon } = buttonConfig[type];
  return (
    <ButtonContainer onClick={onClick} data-testid={testId} aria-label={name}>
      <IconWrapper>{icon}</IconWrapper>
      <TextWrapper>{name}</TextWrapper>
    </ButtonContainer>
  );
};

export default IconButton;

const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1.0625rem 0.9375rem;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 6.1875rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
`;

const IconWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ theme }) => theme.colors.blue700};
`;

const TextWrapper = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
  width: fit-content;
`;
