import type Book from '@src/types/book';
import type Review from '@src/types/review';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useModal from '@src/hooks/useModal';
import { useGetRecordDetail } from '@src/hooks/query/record';
import { bottomsheetState } from '@src/states/atoms';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import BookDetail from '@src/components/library/BookDetail';
import ReviewDetail from '@src/components/library/ReviewDetail';
import RecordBottomsheet from '@src/components/library/RecordBottomsheet';
import ReviewBottomsheet from '@src/components/library/ReviewBottomsheet';
import { ReactComponent as HiOutlinePlus } from '@src/assets/icons/hi_outline_plus.svg';

const RecordDetailPage = () => {
  const { isbn13 = '' } = useParams<{ isbn13: string }>();
  const {
    data: {
      title,
      author,
      cover,
      publisher,
      pubDate,
      description,
      itemPage,
      record,
      reviewList,
    },
  } = useGetRecordDetail(isbn13);
  const [isTop, setIsTop] = useState<boolean>(true);

  const { openModal: openBottomsheet } = useModal(bottomsheetState);
  const handleScroll = () => {
    setIsTop(window.scrollY < 70);
  };
  const openRecordBottomsheet = () => {
    openBottomsheet(
      <RecordBottomsheet isbn13={isbn13} {...record} itemPage={itemPage} />,
    );
  };
  const openReviewBottomsheet = (
    reviewId?: Review['reviewId'],
    star?: Review['star'],
    content?: Review['content'],
  ) => {
    if (record) {
      openBottomsheet(
        <ReviewBottomsheet
          recordId={record.recordId}
          reviewId={reviewId}
          star={star}
          content={content}
        />,
      );
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SHeader text={isTop ? '' : title} headerType='back' $isTop={isTop} />
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
        {record && (
          <ReviewCreateButton onClick={() => openReviewBottomsheet()}>
            <HiOutlinePlus width={20} height={20} />
          </ReviewCreateButton>
        )}
        {reviewList?.map(
          ({ reviewId, star, content, createdAt, modifiedAt }) => (
            <ReviewDetail
              key={reviewId}
              reviewId={reviewId}
              star={star}
              content={content}
              createdAt={createdAt}
              modifiedAt={modifiedAt}
              openBottomsheet={() => {
                openReviewBottomsheet(reviewId, star, content);
              }}
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
    top: 0;
    left: 0;
    z-index: -2;

    opacity: 60%;

    width: 23.4375rem;
    height: 7.8125rem;
    flex-shrink: 0;

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
