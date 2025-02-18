import type Book from '@src/types/book';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useLoaderData from '@src/hooks/useRoaderData';
import { useGetPatchShareClimbingReview } from '@src/hooks/query/climbing';
import styled from 'styled-components';
import Button from '@src/components/common/button/Button';
import Review from '@src/components/library/Review';
import React, { useState } from 'react';
import { ReactComponent as CheckIcon } from '@src/assets/icons/md_check.svg';

const ReviewShareComponent = ({
  bookInfo,
  isShareable,
  reviewList,
}: {
  bookInfo: Book;
  isShareable: boolean;
  reviewList?: {
    content: string;
    createdAt: string;
    modifiedAt: string;
    reviewId: number;
    star: number;
  }[];
}) => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { shareReview } = useGetPatchShareClimbingReview(climbingId);

  const [selectedReviewId, setSelectedReviewId] = useState<number>(0);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReviewId(Number(e.target.value));
  };
  const handleRadioButtonClick = (reviewId: number) => {
    setSelectedReviewId(reviewId);
  };

  const handleSubmit = () => {
    if (isShareable) {
      shareReview.mutate(selectedReviewId, {
        onSuccess: () => {
          window.location.reload();
        },
      });
    } else {
      handleNavigateRecord();
    }
  };

  const navigate = useNavigate();
  const handleNavigateRecord = () => {
    const path = ROUTE_PATH.libraryRecordDetail.replace(
      ':isbn13',
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
      <ListWrapper>
        {isShareable &&
          reviewList?.map((review, idx) => (
            <div key={idx}>
              <label className='radio-wrapper'>
                <input
                  type='radio'
                  name='selectedReview'
                  value={review.reviewId}
                  checked={selectedReviewId === review.reviewId}
                  onChange={handleRadioChange}
                />
                <RadioButton
                  type='button'
                  $checked={selectedReviewId === review.reviewId}
                  onClick={() => handleRadioButtonClick(review.reviewId)}
                >
                  {selectedReviewId === review.reviewId ? <CheckIcon /> : null}
                </RadioButton>
                <Review
                  key={idx}
                  star={review.star}
                  content={review.content}
                  createdAt={review.createdAt}
                  modifiedAt={review.modifiedAt}
                />
              </label>
            </div>
          ))}
        {!isShareable && (
          <p className='no-data'>아직 감상평을 작성하지 않았어요.</p>
        )}
      </ListWrapper>
      <Button
        type='submit'
        onClick={handleSubmit}
        disabled={isShareable && !selectedReviewId}
      >
        {isShareable ? '공유하기' : '감상평 작성하러 가기'}
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

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.gap['12']};

  .no-data {
    width: 100%;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.neutral0};
    border-radius: ${({ theme }) => theme.rounded['8']};
    padding: 4rem 0;
  }

  .radio-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: ${({ theme }) => theme.gap['6']};
    padding: ${({ theme }) => theme.padding['8']};

    background-color: ${({ theme }) => theme.colors.neutral0};
    border-radius: ${({ theme }) => theme.rounded['8']};
  }
`;

const RadioButton = styled.button<{ $checked: boolean }>`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;

  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.blue300 : theme.colors.neutral200};
  color: ${({ theme }) => theme.colors.neutral0};

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;
