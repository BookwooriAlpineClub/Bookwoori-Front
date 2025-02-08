import Book from '@src/types/book';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookDetail } from '@src/hooks/query/book';
import { useGetRecordDetail } from '@src/hooks/query/record';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import BookDetail from '@src/components/library/BookDetail';
import ReviewDetail from '@src/components/library/ReviewDetail';
import { ReactComponent as HiOutlinePlus } from '@src/assets/icons/hi_outline_plus.svg';

const RecordDetailPage = () => {
  const { bookId: isbn13 = '' } = useParams<{ bookId: string }>();
  const {
    data: { title, author, cover, publisher, pubDate, description, itemPage },
  } = useGetBookDetail(isbn13);
  const {
    data: { record, reviewList },
  } = useGetRecordDetail(isbn13);
  const [isTop, setIsTop] = useState<boolean>(true);

  const handleScroll = () => {
    setIsTop(window.scrollY < 70);
  };
  const openRecordBottomsheet = () => {};
  const openReviewBottomsheet = () => {};

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SHeader text='' headerType='back' $isTop={isTop} />
      <Main $cover={cover}>
        <BookDetail
          title={title}
          author={author}
          cover={cover}
          publisher={publisher}
          pubDate={pubDate}
          itemPage={itemPage}
          record={record}
          openBottomsheet={openRecordBottomsheet}
        />
        <ReviewCreateButton>
          <HiOutlinePlus width={20} height={20} />
        </ReviewCreateButton>
        {reviewList.map(
          ({ reviewId, star, content, createdAt, modifiedAt }) => (
            <ReviewDetail
              key={reviewId}
              reviewId={reviewId}
              star={star}
              content={content}
              createdAt={createdAt}
              modifiedAt={modifiedAt}
              openBottomsheet={openReviewBottomsheet}
            />
          ),
        )}
        <Description>{description}</Description>
      </Main>
    </>
  );
};

export default RecordDetailPage;

const Main = styled.main<{ $cover: Book['cover'] }>`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[16]};

  &::before {
    content: '';

    position: absolute;
    z-index: -2;

    opacity: 60%;
    background: url(${({ $cover }) => $cover}) center / cover no-repeat;
    filter: blur(12px);
  }
  &::after {
    content: '';

    position: absolute;
    top: 6.69rem;
    left: 0;
    z-index: -1;

    width: 100%;
    height: -webkit-fill-available;

    border-radius: ${({ theme }) =>
      `${theme.rounded[16]} ${theme.rounded[16]} 0 0`};
    background-color: ${({ theme }) => theme.colors.neutral0};
  }
`;
const SHeader = styled(Header)<{ $isTop: boolean }>`
  background-color: ${({ $isTop, theme }) =>
    $isTop ? 'transparent' : theme.colors.neutral0};
`;
const ReviewCreateButton = styled.button`
  display: flex;
  justify-content: center;

  padding: ${({ theme }) => theme.padding[16]};

  border-radius: ${({ theme }) => theme.rounded[12]};
  background-color: ${({ theme }) => theme.colors.neutral0};

  color: ${({ theme }) => theme.colors.blue500};
`;
const Description = styled.p`
  ${({ theme }) => theme.fonts.body}
`;
