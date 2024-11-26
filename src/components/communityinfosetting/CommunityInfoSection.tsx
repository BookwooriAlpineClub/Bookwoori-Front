import TitleAndFieldContainer from '@src/components/common/TitleAndFieldContainer';
import CommunityInfoCard from '@src/components/common/CommunityInfoCard';

interface CommunityInfoProps {
  name: string;
  memberInfo: string;
  creationDate: string;
  description: string;
  imageUrl: string;
}

const CommunityInfoSection = ({
  name,
  memberInfo,
  creationDate,
  description,
  imageUrl,
}: CommunityInfoProps) => {
  const subtitle = '공동체 정보';
  return (
    <TitleAndFieldContainer title={subtitle}>
      <CommunityInfoCard
        name={name}
        memberInfo={memberInfo}
        creationDate={creationDate}
        description={description}
        imageUrl={imageUrl}
      />
    </TitleAndFieldContainer>
  );
};

export default CommunityInfoSection;
