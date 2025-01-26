import CommunityInfoCard from '@src/components/common/CommunityInfoCard';
import Fieldset from '@src/components/common/Fieldset';

export interface CommunityInfoProps {
  name?: string;
  memberInfo?: string;
  creationDate?: string;
  description?: string;
  serverImg?: string;
}

const CommunityInfoSection = ({
  name = '',
  memberInfo = '',
  creationDate = '',
  description = '',
  serverImg = '',
}: CommunityInfoProps) => {
  return (
    <Fieldset title='공동체 정보'>
      <CommunityInfoCard
        name={name}
        memberInfo={memberInfo}
        creationDate={creationDate}
        description={description}
        imageUrl={serverImg}
      />
    </Fieldset>
  );
};

export default CommunityInfoSection;
