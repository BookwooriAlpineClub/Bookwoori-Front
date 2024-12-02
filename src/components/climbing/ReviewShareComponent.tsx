import Button from '@src/components/common/Button';
import styled from 'styled-components';
import { ClimbingResponse } from '@src/types/apis/climbing.d';
import ReviewItem from '@src/components/book/ReviewItem';
import { useMutation } from '@tanstack/react-query';
import { patchShareClimbingReview } from '@src/apis/climbing';
import useLoaderData from '@src/hooks/useRoaderData';

/*
 *
 * { bookInfo, star, reviewContent }: Review
 * */

const ReviewShareComponent = ({
  star,
  content,
  bookInfo,
  isShareable,
}: ClimbingResponse) => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const mutation = useMutation({
    mutationFn: () => patchShareClimbingReview(climbingId),
    onSuccess: () => {
      console.log('Review shared successfully!');
    },
    onError: (error) => {
      console.error('Error sharing review:', error);
    },
  });
  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <>
      <TextContainer>
        <Text>감상평을 공유해주세요!</Text>
        <SubText>나의 감상평을 공유하고 멤버들과 감상을 나눠보세요.</SubText>
      </TextContainer>
      <ItemWrapper>
        {isShareable && (
          <ReviewItem
            bookInfo={bookInfo}
            star={star ?? 0}
            reviewContent={content ?? ''}
          />
        )}
        {!isShareable && (
          <div>아직 감상평을 작성하지 않았어요. 감상평 작성하러가기</div>
        )}
      </ItemWrapper>
      <Button type='submit' onClick={handleSubmit} disabled={!isShareable}>
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
  ${({ theme }) => theme.fonts.header};
  color: ${({ theme }) => theme.colors.black100};
`;

const SubText = styled.p`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black200};
`;

const ItemWrapper = styled.div`
  border: solid 0.1rem ${({ theme }) => theme.colors.black200};
  border-radius: 0.625rem;
`;
