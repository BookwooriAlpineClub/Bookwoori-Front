import styled from 'styled-components';
import BookIcon from '@mui/icons-material/Book';
import { Climbing } from '@src/types/apis/climbing.d';

const ClimbingDetail = ({ data }: { data: Climbing }) => {
  console.log(data);
  return (
    <Container>
      <Thumbnail>
        <ThumbnailImg src={data.bookInfo.cover} />
      </Thumbnail>
      <Content>
        <BookInfo>
          <StyledBookIcon />
          <BookTitle>{`${data.name}, 《${data.bookInfo.title}》, ${data.bookInfo.itemPage}p`}</BookTitle>
        </BookInfo>
        <Memo>{data.description}</Memo>
      </Content>
    </Container>
  );
};

export default ClimbingDetail;

const Container = styled.div`
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
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 0.15rem;
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;

const BookTitle = styled.p`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
  text-overflow: ellipsis;
  text-align: start;

  &::first-line {
    line-height: 1;
  }
`;

const StyledBookIcon = styled(BookIcon)`
  width: 1rem;
  height: 1rem;
  color: ${({ theme }) => theme.colors.black200};
`;

const Memo = styled.p`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black200};
  white-space: normal;
  word-wrap: break-word;
  text-align: justify;
  min-height: 4rem;
  padding: 0 0 0 0.2rem;
`;
