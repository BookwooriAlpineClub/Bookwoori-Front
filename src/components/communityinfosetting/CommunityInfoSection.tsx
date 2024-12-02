import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';
import CommunityInfoCard from '@src/components/common/CommunityInfoCard';

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
  const subtitle = '공동체 정보';
  return (
    <TitleAndFieldContainer title={subtitle}>
      <CommunityInfoCard
        name={name}
        memberInfo={memberInfo}
        creationDate={creationDate}
        description={description}
        imageUrl={serverImg}
      />
    </TitleAndFieldContainer>
  );
};

export default CommunityInfoSection;
