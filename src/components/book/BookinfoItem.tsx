import type { GetBookListRes } from '@src/types/apis/book';
import styled, { css } from 'styled-components';

interface Props extends Omit<ElementOfArray<GetBookListRes>, 'isbn13'> {
  onClick?: () => void;
}

const BookinfoItem = ({
  title,
  author,
  cover,
  publisher,
  pubYear,
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
  gap: ${({ theme }) => theme.gap[16]};
`;
const TextWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[4]};

  width: 100%;
`;
const PubWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap[4]};
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
