import styled from 'styled-components';

interface IntroSectionProps {
  title: string;
  bodyLines: { text: string }[];
}

const IntroSection = ({ title, bodyLines }: IntroSectionProps) => {
  return (
    <IntroContainer>
      <IntroTitle>{title}</IntroTitle>
      <IntroBody>
        {bodyLines.map((line, idx) => (
          <span key={idx}>{line.text}</span>
        ))}
      </IntroBody>
    </IntroContainer>
  );
};

export default IntroSection;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.62rem;
`;

const IntroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.header};
  color: ${({ theme }) => theme.colors.neutral950};
`;

const IntroBody = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral400};
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.25rem;

  span {
    display: block;
  }
`;
