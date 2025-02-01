import type Book from '@src/types/book';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetPatchShareClimbingReview } from '@src/hooks/query/climbing';
import styled from 'styled-components';
import Button from '@src/components/common/Button';
import UnderlineButton from '@src/components/common/UnderlineButton';
// import ReviewListItem from '@src/components/book/ReviewListItem';

/*
 *
 * { bookInfo, star, reviewContent }: Review
 * */

const ReviewShareComponent = ({
  bookInfo,
  isShareable,
}: {
  bookInfo: Book;
  isShareable: boolean;
}) => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { shareReview } = useGetPatchShareClimbingReview(climbingId);

  const handleSubmit = () => {
    shareReview.mutate();
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    const path = ROUTE_PATH.libraryBookDetail.replace(
      ':bookId',
      bookInfo.isbn13,
    );
    navigate(path);
  };

  return (
    <>
      <TextContainer>
        <Text>감상평을 공유해주세요!</Text>
        <SubText>나의 감상평을 공유하고 멤버들과 감상을 나눠보세요.</SubText>
      </TextContainer>
      <ItemWrapper>
        {isShareable && (
          // <ReviewListItem />
          <div>book에서 가져올 리뷰 아이템</div>
        )}
        {!isShareable && (
          <Wrapper>
            <div>아직 감상평을 작성하지 않았어요.</div>
            <UnderlineButton
              text='감상평 작성하러가기'
              onClick={handleNavigate}
            />
          </Wrapper>
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
  color: ${({ theme }) => theme.colors.neutral950};
`;

const SubText = styled.p`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral400};
`;

const ItemWrapper = styled.div`
  border: solid 0.06rem ${({ theme }) => theme.colors.neutral950};
  border-radius: 0.1rem;
  padding: 0.9375rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;
