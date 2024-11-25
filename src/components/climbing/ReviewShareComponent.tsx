import Button from '@src/components/common/Button';
import styled from 'styled-components';

interface ReviewShareComponentProps {
  isAllowed: boolean;
}

const ReviewShareComponent = ({ isAllowed }: ReviewShareComponentProps) => {
  const handleSubmit = () => {
    console.log('리뷰 공유하기 버튼 클릭');
  };

  return (
    <>
      <TextContainer>
        <Text>감상평을 공유해주세요!</Text>
        <SubText>나의 감상평을 공유하고 멤버들과 감상을 나눠보세요.</SubText>
      </TextContainer>
      <div>감상평 컴포넌트</div>
      <Button type='submit' onClick={handleSubmit} disabled={!isAllowed}>
        나도 공유하기
      </Button>
    </>
  );
};

export default ReviewShareComponent;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const Text = styled.p`
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.black100};
`;

const SubText = styled.p`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
