import React from 'react';
import SectionContainer from '@src/components/communityinfosetting/SectionContainer';
import styled from 'styled-components';
import CommunityButton from '@src/components/common/CommunityButton';
import { CommunityRoleType } from '@src/pages/communityinfosetting/CommunityInfoSettingPage';

export interface CommunitySettingSectionProps {
  communityRole: CommunityRoleType;
}

const CommunitySettingSection: React.FC<CommunitySettingSectionProps> = ({
  communityRole,
}) => {
  const subtitle = '공동체 설정';
  return (
    <SectionContainer>
      <Body>{subtitle}</Body>
      {communityRole === 'admin' && (
        <>
          <CommunityButton
            type='transferAuthority'
            testId='transfer-authority-button'
            onClick={() => alert('transferAuthority')}
          />
          <CommunityButton
            type='deleteCommunity'
            testId='delete-community-button'
            onClick={() => alert('deleteCommunity')}
          />
        </>
      )}
      {communityRole === 'user' && (
        <CommunityButton
          type='leaveCommunity'
          testId='leave-community-button'
          onClick={() => alert('leaveCommunity')}
        />
      )}
    </SectionContainer>
  );
};

export default CommunitySettingSection;

const Body = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
