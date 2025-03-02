import ReviewShareComponent from '@src/components/climbing/ReviewShareComponent';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetClimbingReview } from '@src/hooks/query/climbing';
import styled from 'styled-components';
import Spinner from '@src/components/common/Spinner';
import ReviewItem from '@src/components/climbing/ReviewItem';
import ExpandableList from '@src/components/common/ExpandableList';

const ReviewBoard = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { getReviews: data, isLoading } = useGetClimbingReview(climbingId);

  if (isLoading) return <Spinner />;
  if (!data) return null;

  return (
    <Container>
      {data.hasShared ? (
        <ExpandableList
          items={data.ClimbingMemberReviewList}
          renderItem={(review) => (
            <ReviewItem
              key={review.reviewId}
              climbingId={climbingId}
              review={review}
            />
          )}
        />
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
