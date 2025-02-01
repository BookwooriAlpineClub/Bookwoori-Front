import { useGetReviewList } from '@src/hooks/query/record';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';
import ReviewListItem from '@src/components/book/ReviewListItem';

const ReviewListPage = () => {
  const { data: reviewList } = useGetReviewList();

  return (
    <NoDataTextLayout>
      <Header text='책 평가' headerType='back' />
      <main>
        {reviewList.length !== 0 ? (
          <Ul>
            {reviewList.map((item) => (
              <ReviewListItem key={item.isbn13} {...item} />
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
  gap: ${({ theme }) => theme.gap[16]};
`;
