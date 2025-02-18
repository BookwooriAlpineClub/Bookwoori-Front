import ReviewShareComponent from '@src/components/climbing/ReviewShareComponent';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetClimbingReview } from '@src/hooks/query/climbing';
import styled from 'styled-components';
import Spinner from '@src/components/common/Spinner';
import ReviewItem from '@src/components/climbing/ReviewItem';

const ReviewBoard = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { getReviews: data, isLoading } = useGetClimbingReview(climbingId);

  if (isLoading) return <Spinner />;
  if (!data) return null;

  console.log(data);

  return (
    <Container className='scroll-area'>
      {data.hasShared ? (
        <ReviewListContainer>
          {data.ClimbingMemberReviewList.map((review, idx) => (
            <ReviewItem key={idx} climbingId={climbingId} review={review} />
          ))}
        </ReviewListContainer>
      ) : (
        <ReviewShareComponent {...data} />
      )}
    </Container>
  );
};

export default ReviewBoard;

const Container = styled.div`
  gap: ${({ theme }) => theme.gap['4']};
  justify-content: space-between;
`;

const ReviewListContainer = styled.div`
  gap: ${({ theme }) => theme.gap['4']};
`;
