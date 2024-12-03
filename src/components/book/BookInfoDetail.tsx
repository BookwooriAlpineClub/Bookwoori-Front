import type { BookInfo } from '@src/types/apis/book';
import type { Record } from '@src/types/apis/record';
import styled from 'styled-components';
import { BookImg, TextEllipsis } from '@src/styles/mixins';
import Tag from '@src/components/common/Tag';

type Props = BookInfo & Pick<Record, 'readingStatus'>;

const BookInfoDetail = ({
  readingStatus,
  title,
  author,
  publisher,
  pubDate,
  itemPage,
  cover,
}: Props) => {
  const calcStatusText = () => {
    switch (readingStatus) {
      case 'WISH':
        return '읽고 싶어요';
      case 'READING':
        return '읽고 있어요';
      case 'FINISHED':
        return '다 읽었어요';
      default:
        return '';
    }
  };

  return (
    <Container>
      <Img src={cover} alt='책 표지' />
      <InfoWrapper>
        {readingStatus !== 'UNREAD' && <Tag>{calcStatusText()}</Tag>}
        <Title $line={2}>{title}</Title>
        <CaptionEllipsis $line={1}>{author}</CaptionEllipsis>
        <PubWrapper>
          <CaptionEllipsis $line={1}>{publisher}</CaptionEllipsis>
          <Caption>·</Caption>
          <Caption>{pubDate}</Caption>
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
  gap: 1.25rem;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.31rem;

  mark {
    margin-bottom: 0.44rem;
  }
`;
const PubWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.19rem;
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
