import type { BookListItem } from '@src/types/apis/book.d';
import styled, { css } from 'styled-components';

interface Props extends Omit<BookListItem, 'isbn13'> {
  onClick?: () => void;
}

const BookinfoItem = ({
  title,
  author,
  publisher,
  pubYear,
  cover,
  onClick,
}: Props) => {
  return (
    <Container onClick={onClick}>
      <Img src={cover} alt='책 표지' loading='lazy' />
      <TextWrapper>
        <BodyEllipsis>{title}</BodyEllipsis>
        <CaptionEllipsis>{author}</CaptionEllipsis>
        <PubWrapper>
          <CaptionEllipsis>{publisher}</CaptionEllipsis>
          <Caption>·</Caption>
          <Caption>{pubYear}</Caption>
        </PubWrapper>
      </TextWrapper>
    </Container>
  );
};

export default BookinfoItem;

const Container = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.31rem;

  width: 100%;
`;
const PubWrapper = styled.div`
  display: flex;
  gap: 0.19rem;
`;
const Img = styled.img`
  flex-shrink: 0;

  width: 4.16669rem;

  object-fit: contain;
`;
const TextEllipsis = css`
  display: -webkit-box;
  overflow: hidden;

  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
`;
const BodyEllipsis = styled.span`
  ${({ theme }) => theme.fonts.body}
  ${TextEllipsis}
  -webkit-line-clamp: 3;
`;
const CaptionEllipsis = styled.span`
  ${({ theme }) => theme.fonts.caption}
  ${TextEllipsis}
  -webkit-line-clamp: 1;
`;
const Caption = styled.span`
  ${({ theme }) => theme.fonts.caption}
`;
