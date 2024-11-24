import type { Review } from '@src/types/apis/record';
import styled from 'styled-components';
import { ListLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';

const ReviewListPage = () => {
  const reviewList: Review[] = [];

  return (
    <ListLayout>
      <Header text='책 평가' headerType='back' />
      {reviewList.length !== 0 ? (
        <Ul>
          {/* {reviewList.map((item) => (
            <li></li>
          ))} */}
        </Ul>
      ) : (
        <strong>감상평을 작성해 주세요.</strong>
      )}
    </ListLayout>
  );
};

export default ReviewListPage;

const Ul = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.94rem;

  margin: 0.94rem 5%;
`;
