import React from 'react';
import styled from 'styled-components';
import SectionContainer from '@src/components/communityinfosetting/SectionContainer';

interface CommunityInfoProps {
  name: string;
  memberInfo: string;
  creationDate: string;
  description: string;
  imageUrl: string;
}

const CommunityInfoSection: React.FC<CommunityInfoProps> = ({
  name,
  memberInfo,
  creationDate,
  description,
  imageUrl,
}) => {
  const subtitle = '공동체 정보';
  return (
    <SectionContainer>
      <Body>{subtitle}</Body>
      <CardContainer>
        <ImageWrapper>
          <img src={imageUrl} alt={`${name} profile`} />
        </ImageWrapper>
        <ContentWrapper>
          <Name>{name}</Name>
          <MemberInfo>{memberInfo}</MemberInfo>
          <CreationDate>{creationDate}</CreationDate>
          <Description>{description}</Description>
        </ContentWrapper>
      </CardContainer>
    </SectionContainer>
  );
};

export default CommunityInfoSection;

const Body = styled.h2`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  width: 100%;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2.19rem 1.88rem;
`;

const ImageWrapper = styled.div`
  width: 9.375rem;
  height: 9.375rem;
  padding: 0.875rem 0.625rem;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.colors.black200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    font-family: ${({ theme }) => theme.fonts.caption};
    color: ${({ theme }) => theme.colors.black300};
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

const Name = styled.div`
  font-family: ${({ theme }) => theme.fonts.nickname};
  color: ${({ theme }) => theme.colors.black100};
`;

const MemberInfo = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.blue100};
`;

const CreationDate = styled.div`
  font-family: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black200};
`;

const Description = styled.div`
  font-family: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black200};
`;
