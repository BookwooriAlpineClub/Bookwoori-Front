import CommunityButton from '@src/components/common/IconButton';
import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';

const CommunitySettingSection = ({ isOwner }: { isOwner?: boolean }) => {
  const subtitle = '공동체 설정';
  return (
    <TitleAndFieldContainer title={subtitle}>
      {isOwner && (
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
      {!isOwner && (
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
