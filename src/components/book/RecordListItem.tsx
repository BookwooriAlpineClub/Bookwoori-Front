import type { Record } from '@src/types/apis/record';
import { ROUTE_PATH } from '@src/constants/routePath';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import styled from 'styled-components';
import { TextEllipsis, BookImg } from '@src/styles/mixins';
import Chip from '@src/components/common/Chip';
import { ReactComponent as IcnBook } from '@src/assets/icons/md_auto_stories.svg';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

type Props = Pick<
  Record,
  'recordId' | 'readingStatus' | 'currentPage' | 'star' | 'bookInfo'
>;

const RecordListItem = ({
  recordId,
  readingStatus,
  currentPage,
  star,
  bookInfo,
}: Props) => {
  const navigate = useEncodedNavigate();
  const { title, author, cover, itemPage } = bookInfo;
  const chips: { [key: string]: React.ReactElement | null } = {
    WISH: null,
    READING: (
      <SChip
        Icon={IcnBook}
        text={`${Math.round((currentPage / itemPage) * 100)}%`}
      />
    ),
    FINISHED: <SChip Icon={IcnStar} text={star} />,
  };

  const handleItemClick = () => {
    navigate(ROUTE_PATH.libraryRecord, recordId);
  };

  return (
    <Container onClick={handleItemClick}>
      <Img src={cover} alt='책 표지' />
      <Title $line={1}>{title}</Title>
      <Author $line={1}>{author}</Author>
      {chips[readingStatus]}
    </Container>
  );
};

export default RecordListItem;

const Container = styled.li`
  position: relative;

  display: flex;
  flex-flow: column nowrap;
  gap: 0.25rem;

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
const SChip = styled(Chip)`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
`;
