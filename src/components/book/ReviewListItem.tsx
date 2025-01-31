import type { GetReviewListRes } from '@src/types/apis/record';
import { ROUTE_PATH } from '@src/constants/routePath';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import styled from 'styled-components';
import { TextEllipsis } from '@src/styles/mixins';
import BookListItem from '@src/components/book/BookListItem';
import StarReview from '@src/components/book/StarReview';

type Props = ElementOfArray<GetReviewListRes>;

const ReviewListItem = ({
  isbn13,
  title,
  author,
  cover,
  publisher,
  pubYear,
  records,
}: Props) => {
  const navigate = useEncodedNavigate();
  const handleItemClick = () => {
    navigate(ROUTE_PATH.libraryRecord, Number(isbn13));
  };

  return (
    <Container onClick={handleItemClick}>
      <BookListItem
        title={title}
        author={author}
        cover={cover}
        publisher={publisher}
        pubYear={pubYear}
      />
      {records.map(
        ({ recordId, startDate, endDate, starReview, contentReview }) => (
          <>
            <Hr />
            <Li key={recordId}>
              <ReviewInfoWrapper>
                <Period>{`${startDate} - ${endDate}`}</Period>
                <StarReview starReview={starReview} />
              </ReviewInfoWrapper>
              <ReviewContent $line={3}>{contentReview}</ReviewContent>
            </Li>
          </>
        ),
      )}
    </Container>
  );
};

export default ReviewListItem;

const Container = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[16]};

  width: 100%;
  padding: ${({ theme }) => theme.padding[16]};

  border-radius: ${({ theme }) => theme.rounded[12]};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const Hr = styled.hr`
  width: 100%;
  height: 0.09375rem;

  background-color: ${({ theme }) => theme.colors.neutral50};
`;
const Li = styled.li`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[8]};
`;
const ReviewInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Period = styled.p`
  ${({ theme }) => theme.fonts.mountain};
`;
const ReviewContent = styled.p<{ $line: number }>`
  ${({ theme }) => theme.fonts.body};
  ${TextEllipsis};
`;
