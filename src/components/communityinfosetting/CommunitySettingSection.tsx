import CommunityButton from '@src/components/common/CommunityButton';
import { CommunityRoleType } from '@src/pages/communityinfosetting/CommunityInfoSettingPage';
import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';

export interface CommunitySettingSectionProps {
  communityRole: CommunityRoleType;
}

const CommunitySettingSection = ({
  communityRole,
}: CommunitySettingSectionProps) => {
  const subtitle = '공동체 설정';
  return (
    <TitleAndFieldContainer title={subtitle}>
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
    </TitleAndFieldContainer>
  );
};

export default CommunitySettingSection;
