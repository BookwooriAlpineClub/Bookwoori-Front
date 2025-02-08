import type BookType from '@src/types/book';
import type RecordType from '@src/types/record';
import styled from 'styled-components';
import { BookImg, TextEllipsis } from '@src/styles/mixins';
import Tag from '@src/components/common/Tag';
import { ReactComponent as HiOutlinePlus } from '@src/assets/icons/hi_outline_plus.svg';
import { ReactComponent as MdBook } from '@src/assets/icons/md_book.svg';
import { ReactComponent as MdAutoStories } from '@src/assets/icons/md_auto_stories.svg';
import { ReactComponent as Done } from '@src/assets/icons/done.svg';

interface Props extends Omit<BookType, 'isbn13' | 'description'> {
  record: RecordType;
  openBottomsheet: () => void;
}

const BookDetail = ({
  title,
  author,
  cover,
  publisher,
  pubDate,
  itemPage,
  record,
  openBottomsheet,
}: Props) => {
  const TagConfigs: Record<RecordType['status'], React.ReactElement> = {
    UNREAD: (
      <STag color='blue' Icon={HiOutlinePlus} onClick={openBottomsheet} />
    ),
    WISH: (
      <STag
        color='blue'
        Icon={MdBook}
        text='읽고 싶어요'
        onClick={openBottomsheet}
      />
    ),
    READING: (
      <STag
        color='blue'
        Icon={MdAutoStories}
        text='읽고 있어요'
        onClick={openBottomsheet}
      >
        <Blue900Span>{record.startDate}</Blue900Span>
        <Blue900Span>{`${record.currentPage}쪽/${itemPage}쪽`}</Blue900Span>
      </STag>
    ),
    FINISHED: (
      <STag
        color='blue'
        Icon={Done}
        text='다 읽었어요'
        onClick={openBottomsheet}
      >
        <Blue900Span>{`${record.startDate}-${record.endDate}`}</Blue900Span>
      </STag>
    ),
  };

  return (
    <Container>
      <Img src={cover} alt='책 표지' />
      <InfoWrapper>
        <Title $line={2}>{title}</Title>
        <CaptionEllipsis $line={1}>{author}</CaptionEllipsis>
        <ThirdWrapper>
          <CaptionEllipsis $line={1}>{publisher}</CaptionEllipsis>
          <Caption>·</Caption>
          <CaptionEllipsis $line={1}>{pubDate}</CaptionEllipsis>
          <Caption>·</Caption>
          <CaptionEllipsis $line={1}>{itemPage}쪽</CaptionEllipsis>
        </ThirdWrapper>
        {record ? (
          TagConfigs[record.status]
        ) : (
          <STag color='blue' Icon={HiOutlinePlus} onClick={openBottomsheet} />
        )}
      </InfoWrapper>
    </Container>
  );
};

export default BookDetail;

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
`;
const ThirdWrapper = styled.div`
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
const Blue900Span = styled.span`
  color: ${({ theme }) => theme.colors.blue900};
`;
const STag = styled(Tag)`
  justify-content: center;

  width: 100%;
`;
