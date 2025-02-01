import styled from 'styled-components';
import { ReactComponent as BookIcon } from '@src/assets/icons/md_book.svg';
import { Climbing } from '@src/types/climbing';

const ClimbingDetail = ({ data }: { data: Climbing }) => {
  return (
    <DetailWrapper>
      <Thumbnail>
        <img alt={data.name} src={data.bookInfo.cover} />
      </Thumbnail>
      <ClimbingContent>
        <BookInfo>
          <StyledBookIcon />
          <p>{`${data.bookInfo.author}, 《${data.bookInfo.title}》, ${data.bookInfo.itemPage}p`}</p>
        </BookInfo>
        <Description>{data.description ?? '클라이밍 설명 없음'}</Description>
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
  height: 100%;
`;

const Thumbnail = styled.div`
  width: 3.2rem;
  height: auto;
  border-radius: 0.25rem;
  flex-shrink: 0;
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

  p {
    white-space: normal;
    text-overflow: ellipsis;
    text-align: start;

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

const Description = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral400};
  white-space: normal;
  word-wrap: break-word;
  text-align: justify;
  min-height: 4rem;
  padding: 0 0 0 ${({ theme }) => theme.padding['6']};
`;
