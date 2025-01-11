import styled from 'styled-components';

interface CommunityInfoCardProps {
  name: string;
  memberInfo: string;
  creationDate: string;
  description: string;
  imageUrl: string;
}

const CommunityInfoCard = ({
  name,
  memberInfo,
  creationDate,
  description,
  imageUrl,
}: CommunityInfoCardProps) => {
  return (
    <CardContainer>
      <ImageWrapper>
        <img src={imageUrl} alt={`${name} profile`} />
      </ImageWrapper>
      <ContentWrapper>
        <Name>{name}</Name>
        <MemberInfo>{memberInfo}</MemberInfo>
        <Caption>{creationDate}</Caption>
        <Caption>{description}</Caption>
      </ContentWrapper>
    </CardContainer>
  );
};

export default CommunityInfoCard;

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  width: 100%;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 2.19rem 1.88rem;
`;

const ImageWrapper = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-radius: 0.625rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    font-family: ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.neutral50};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.62rem;
  width: 100%;
`;

const Name = styled.span`
  font-family: ${({ theme }) => theme.fonts.nickname};
  color: ${({ theme }) => theme.colors.neutral950};
`;

const MemberInfo = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.blue500};
`;

const Caption = styled.span`
  font-family: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral400};
`;
