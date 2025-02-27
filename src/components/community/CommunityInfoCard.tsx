import styled from 'styled-components';

interface CommunityInfoCardProps {
  name: string;
  memberInfo: string;
  creationDate: string;
  description: string;
  imageUrl: string | null;
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
      <ImageWrapper $isText={!imageUrl}>
        {imageUrl ? (
          <img src={imageUrl} alt={`${name}`} />
        ) : (
          <span>{name.substring(0, 2)}</span>
        )}
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

const ImageWrapper = styled.div<{ $isText: boolean }>`
  width: 9.375rem;
  height: 9.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 0.625rem;

  background-color: ${({ theme, $isText }) =>
    $isText ? theme.colors.blue100 : theme.colors.neutral0};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    font-family: ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.neutral50};
  }

  span {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.blue900};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.62rem;
  width: 100%;

  span {
    width: 100%;
    word-wrap: break-word;
    text-align: center;
  }
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
