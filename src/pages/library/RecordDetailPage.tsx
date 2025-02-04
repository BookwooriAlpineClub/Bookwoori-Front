import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import { decodeIdParam } from '@src/utils/formatters';
import {
  useGetRecordDetail,
  usePostRecord,
  usePatchRecord,
  useDeleteRecord,
} from '@src/hooks/query/record';
import { useGetBookDetail } from '@src/hooks/query/book';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import BookDetail from '@src/components/library/BookDetail';
import PageField from '@src/components/library/PageField';
import ReviewField from '@src/components/library/ReviewField';

const RecordDetailPage = () => {
  const { bookId: isbn13 = '' } = useParams<{ bookId: string }>();
  const { data: bookDetail } = useGetBookDetail(isbn13);

  const navigate = useNavigate();

  return (
    <Container>
      {/* <Header buttonList={['edit']} handleEditClick={handleEditClick} />
      <main>
        <BookInfoDetail status={status} {...bookDetail} />
        <Description>
          <h2>책 소개</h2>
          <p>{bookDetail.description}</p>
        </Description>
      </main> */}
    </Container>
  );
};

export default RecordDetailPage;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[16]};

  &::before {
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
// const Description = styled.section`
//   display: flex;
//   flex-flow: column nowrap;
//   gap: ${({ theme }) => theme.gap[16]};

//   h2 {
//     ${({ theme }) => theme.fonts.mountain}
//   }
//   p {
//     ${({ theme }) => theme.fonts.body}
//   }
// `;
