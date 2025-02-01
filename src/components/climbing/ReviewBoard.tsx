import ReviewShareComponent from '@src/components/climbing/ReviewShareComponent';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetClimbingReview } from '@src/hooks/query/climbing';
import styled from 'styled-components';
import Spinner from '@src/components/common/Spinner';
import ReviewListItem from '@src/components/book/ReviewListItem';
import ClimbingDescription from '@src/components/climbing/ClimbingDescription';

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
            <ReviewListItem key={idx} />
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
