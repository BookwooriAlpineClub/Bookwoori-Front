import ClimbingDescription from '@src/components/climbing/ClimbingDescription';
import styled from 'styled-components';
import ReviewShareComponent from '@src/components/climbing/ReviewShareComponent';
import ReviewItem from '@src/components/climbing/ReviewItem';
import { useGetClimbingReview } from '@src/hooks/query/climbing';
import useLoaderData from '@src/hooks/useRoaderData';
import Spinner from '@src/components/common/Spinner';

const ReviewBoard = () => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { getReviews: data, isLoading } = useGetClimbingReview(climbingId);

  if (isLoading) return <Spinner />;

  return (
    <Container>
      {data?.hasShared && <ClimbingDescription />}
      <ReviewListContainer>
        {data?.hasShared ? (
          data?.ClimbingMemberReviewList.map((review, idx) => (
            <ReviewItem key={idx} review={review} />
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

  height: calc(100% - 4.375rem);
  gap: 0.625rem;
`;

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.9375rem;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: solid 0.12rem ${({ theme }) => theme.colors.neutral200};
  min-height: 30rem;
  overflow-y: scroll;
`;
