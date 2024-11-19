import styled from 'styled-components';
import BookIcon from '@mui/icons-material/Book';

const ClimbingDetail = () => {
  return (
    <Container>
      <Thumbnail>
        <ThumbnailImg />
      </Thumbnail>
      <Content>
        <Title>
          <StyledBookIcon />
          작가명, 《책 제목 책 제목》, 300p
        </Title>
        <Memo>
          클라이밍에 대한 메모가 적히는 곳. 클라이밍에 대한 메모가 적히는 곳.
          클라이밍에 대한 메모가 적히는 곳. 클라이밍에 대한 메모가 적히는 곳.
          클라이밍에 대한 메모가 적히는 곳. 클라이밍에 대한 메모가 적히는 곳.
        </Memo>
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
  width: 2.625rem;
  height: 3.9375rem;
  background-color: ${({ theme }) => theme.colors.black200};
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

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
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
  min-height: 4rem;
`;
