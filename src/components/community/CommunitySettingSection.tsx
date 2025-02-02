import CommunityButton from '@src/components/common/button/IconButton';
import Fieldset from '@src/components/common/Fieldset';

const CommunitySettingSection = ({ isOwner }: { isOwner?: boolean }) => {
  return (
    <Fieldset title='공동체 설정'>
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
    </Fieldset>
  );
};

export default CommunitySettingSection;
