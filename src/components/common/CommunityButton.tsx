import React from 'react';
import styled from 'styled-components';
import biCrown from '@src/assets/icons/bi_crown.svg';
import fiTrash from '@src/assets/icons/fi_trash_2.svg';
import fiLogOut from '@src/assets/icons/fi_log_out.svg';
import bIUserPlus from '@src/assets/icons/bi_user_plus.svg';
import fiSettings from '@src/assets/icons/fi_settings.svg';

type SettingType = 'transferAuthority' | 'deleteCommunity' | 'leaveCommunity';

type FunctionType = 'copyInvitation' | 'detailInfoSetting';

export type CommunityButtonType = SettingType | FunctionType;

interface CommunityButtonProps {
  type: CommunityButtonType;
  onClick?: () => void; // 이벤트가 발생하지 않는 버튼 대비 optional 처리
  testId?: string; // 테스트를 하지 않는 버튼 대비 optional 처리
}

const buttonConfig = {
  transferAuthority: {
    name: '공동체 권한 넘기기',
    icon: biCrown,
  },
  deleteCommunity: {
    name: '공동체 삭제하기',
    icon: fiTrash,
  },
  leaveCommunity: {
    name: '공동체 나가기',
    icon: fiLogOut,
  },
  copyInvitation: {
    name: '공동체 초대장 복사하기',
    icon: bIUserPlus,
  },
  detailInfoSetting: {
    name: '공동체 정보 및 설정 보기',
    icon: fiSettings,
  },
};

const CommunityButton: React.FC<CommunityButtonProps> = ({
  type,
  onClick,
  testId,
}) => {
  const { name, icon } = buttonConfig[type];
  return (
    <ButtonContainer onClick={onClick} data-testid={testId} aria-label={name}>
      <IconWrapper>
        <img src={icon} alt={`${name} icon`} />
      </IconWrapper>
      <TextWrapper>{name}</TextWrapper>
    </ButtonContainer>
  );
};

export default CommunityButton;

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
`;

const TextWrapper = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
  width: fit-content;
`;
