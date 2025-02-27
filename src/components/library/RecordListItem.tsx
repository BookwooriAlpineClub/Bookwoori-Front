import type { GetRecordListRes } from '@src/types/apis/record';
import styled from 'styled-components';
import { TextEllipsis, BookImg } from '@src/styles/mixins';
import Tag from '@src/components/common/Tag';
import { ReactComponent as IcnBook } from '@src/assets/icons/md_auto_stories.svg';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

type Props = ElementOfArray<GetRecordListRes>;

const RecordListItem = ({
  title,
  author,
  cover,
  itemPage = -1,
  record,
  reviewStarAve,
}: Props) => {
  const tagConfig: { [key: string]: React.ReactElement | null } = {
    WISH: null,
    READING: (
      <STag
        color='blue'
        Icon={IcnBook}
        text={`${((record.currentPage ?? 0) / itemPage) * 100}%`}
      />
    ),
    FINISHED: <STag color='blue' Icon={IcnStar} text={reviewStarAve} />,
  };

  return (
    <Container>
      <Img src={cover} alt='책 표지' />
      <Title $line={1}>{title}</Title>
      <Author $line={1}>{author}</Author>
      {tagConfig[record.status]}
    </Container>
  );
};

export default RecordListItem;

const Container = styled.li`
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[4]};

  width: min-content;
`;
const Img = styled.img`
  width: 6.25rem;
  height: 8.59375rem;
  margin-bottom: 0.25rem;

  ${BookImg}
`;
const Title = styled.span<{ $line: number }>`
  ${({ theme }) => theme.fonts.body}
  ${TextEllipsis}
`;
const Author = styled.span<{ $line: number }>`
  ${({ theme }) => theme.fonts.caption}
  ${TextEllipsis}
`;
const STag = styled(Tag)`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
`;
