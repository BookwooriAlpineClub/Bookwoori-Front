import styled from 'styled-components';

interface IntroSectionProps {
  title: string;
  bodyLines: { id: string; text: string }[];
}

const IntroSection = ({ title, bodyLines }: IntroSectionProps) => {
  return (
    <IntroContainer>
      <IntroTitle>{title}</IntroTitle>
      <IntroBody>
        {bodyLines.map((line) => (
          <span key={line.id}>{line.text}</span>
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
  color: ${({ theme }) => theme.colors.black100};
`;

const IntroBody = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black200};
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.25rem;

  span {
    display: block;
  }
`;
