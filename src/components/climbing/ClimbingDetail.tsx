import styled from 'styled-components';
import { ReactComponent as BookIcon } from '@src/assets/icons/md_book.svg';
import { useState } from 'react';
import { GetClimbingRes } from '@src/types/apis/climbing';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';

const ClimbingDetail = ({ data }: { data: GetClimbingRes }) => {
  const string = data.description ?? '클라이밍 설명 없음';
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleThumbnailClick = () => {
    const path = ROUTE_PATH.libraryBookDetail.replace(
      ':isbn13',
      data.bookInfo.isbn13,
    );
    navigate(path);
  };

  return (
    <DetailWrapper>
      <Thumbnail onClick={handleThumbnailClick}>
        <img alt={data.name} src={data.bookInfo.cover} />
      </Thumbnail>
      <ClimbingContent>
        <BookInfo>
          <StyledBookIcon />
          <span>{`${data.bookInfo.author}, 《${data.bookInfo.title}》, ${data.bookInfo.itemPage}p`}</span>
        </BookInfo>
        <Description $isExpanded={isExpanded} onClick={handleToggle}>
          {string}
        </Description>
      </ClimbingContent>
    </DetailWrapper>
  );
};

export default ClimbingDetail;

const DetailWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
  height: fit-content;
`;

const Thumbnail = styled.div`
  width: 3.2rem;
  height: auto;
  border-radius: 0.25rem;
  flex-shrink: 0;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
  }
`;

const ClimbingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: flex-start;

  gap: ${({ theme }) => theme.gap['2']};
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};

  span {
    word-break: break-all;
    overflow-wrap: break-word;
    text-align: start;
    text-overflow: ellipsis;
    overflow: hidden;

    position: relative;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    &::first-line {
      line-height: 1.1rem;
    }
  }
`;

const StyledBookIcon = styled(BookIcon)`
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.blue700};
`;

const Description = styled.span<{
  $isExpanded: boolean;
}>`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral400};
  padding: 0 0 0 ${({ theme }) => theme.padding['6']};
  width: 100%;

  word-break: break-all;
  overflow-wrap: break-word;
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;

  position: relative;

  display: -webkit-box;
  -webkit-box-orient: vertical;

  cursor: ${({ $isExpanded }) => ($isExpanded ? 'auto' : 'pointer')};
  -webkit-line-clamp: ${({ $isExpanded }) => ($isExpanded ? 'auto' : '2')};
`;
