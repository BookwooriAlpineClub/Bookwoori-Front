import type Book from '@src/types/book';
import styled from 'styled-components';
import { BookImg, TextEllipsis } from '@src/styles/mixins';

type Props = Pick<
  Book,
  'title' | 'author' | 'cover' | 'publisher' | 'pubYear' | 'itemPage'
>;

const BookInfoDetail = ({
  title,
  author,
  cover,
  publisher,
  pubYear,
  itemPage,
}: Props) => {
  return (
    <Container>
      <Img src={cover} alt='책 표지' />
      <InfoWrapper>
        <Title $line={2}>{title}</Title>
        <CaptionEllipsis $line={1}>{author}</CaptionEllipsis>
        <PubWrapper>
          <CaptionEllipsis $line={1}>{publisher}</CaptionEllipsis>
          <Caption>·</Caption>
          <Caption>{pubYear}</Caption>
        </PubWrapper>
        <CaptionEllipsis $line={1}>{itemPage}쪽</CaptionEllipsis>
      </InfoWrapper>
    </Container>
  );
};

export default BookInfoDetail;

const Container = styled.section`
  display: flex;
  flex-flow: row nowrap;
  align-items: end;
  gap: ${({ theme }) => theme.gap[16]};
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[8]};

  mark {
    margin-bottom: 0.44rem;
  }
`;
const PubWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: ${({ theme }) => theme.gap[4]};
`;
const Img = styled.img`
  width: 7.5rem;
  height: 11.25rem;

  ${BookImg}
`;
const Title = styled.h1<{ $line: number }>`
  ${({ theme }) => theme.fonts.body}
  ${TextEllipsis}
`;
const CaptionEllipsis = styled.span<{ $line: number }>`
  ${({ theme }) => theme.fonts.caption}
  ${TextEllipsis}
`;
const Caption = styled.span`
  ${({ theme }) => theme.fonts.caption}
`;
