import ReviewShareComponent from '@src/components/climbing/ReviewShareComponent';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetClimbingReview } from '@src/hooks/query/climbing';
import styled from 'styled-components';
import Spinner from '@src/components/common/Spinner';
import ReviewItem from '@src/components/climbing/ReviewItem';
import ClimbingDescription from '@src/components/climbing/ClimbingDescription';

const ReviewBoard = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { getReviews: data, isLoading } = useGetClimbingReview(climbingId);

  if (isLoading) return <Spinner />;
  if (!data) return null;

  return (
    <Container>
      <ClimbingDescription />
      <ReviewListContainer>
        {data.hasShared ? (
          data.ClimbingMemberReviewList.map((review, idx) => (
            <ReviewItem key={idx} climbingId={climbingId} review={review} />
          ))
        ) : (
          <ReviewShareComponent {...data} />
        )}
      </ReviewListContainer>
    </Container>
  );
};

export default ReviewBoard;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.gap['10']};
`;

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: solid 0.1rem ${({ theme }) => theme.colors.neutral200};
  //min-height: 30rem;
  overflow-y: scroll;
  padding: ${({ theme }) => theme.padding['16']};
`;
