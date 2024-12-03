import type { ReviewListItem } from '@src/types/apis/record';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';
import ReviewItem from '@src/components/book/ReviewItem';

const ReviewListPage = () => {
  const reviewList: ReviewListItem[] = mock;

  return (
    <NoDataTextLayout>
      <Header text='책 평가' headerType='back' />
      <main>
        {reviewList.length !== 0 ? (
          <Ul>
            {reviewList.map((item) => (
              <ReviewItem key={item.recordId} {...item} />
            ))}
          </Ul>
        ) : (
          <strong>감상평을 작성해 주세요.</strong>
        )}
      </main>
    </NoDataTextLayout>
  );
};

export default ReviewListPage;

const Ul = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.94rem;
`;
