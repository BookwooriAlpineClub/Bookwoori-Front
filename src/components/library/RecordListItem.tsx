import type { GetRecordListRes } from '@src/types/apis/record';
import { ROUTE_PATH } from '@src/constants/routePath';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import styled from 'styled-components';
import { TextEllipsis, BookImg } from '@src/styles/mixins';
import Tag from '@src/components/common/Tag';
import { ReactComponent as IcnBook } from '@src/assets/icons/md_auto_stories.svg';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

type Props = ElementOfArray<GetRecordListRes>;

const RecordListItem = ({
  isbn13,
  title,
  author,
  cover,
  itemPage,
  record,
  ReviewStarAve,
}: Props) => {
  console.log(itemPage, record, ReviewStarAve);

  const navigate = useEncodedNavigate();
  const tagConfig: { [key: string]: React.ReactElement | null } = {
    WISH: null,
    READING: <STag color='blue' Icon={IcnBook} text='' />,
    FINISHED: <STag color='blue' Icon={IcnStar} text='' />, // 추후 평균값으로 수정
  };
  console.log(tagConfig);

  const handleItemClick = () => {
    navigate(ROUTE_PATH.libraryRecord, Number(isbn13));
  };

  return (
    <Container onClick={handleItemClick}>
      <Img src={cover} alt='책 표지' />
      <Title $line={1}>{title}</Title>
      <Author $line={1}>{author}</Author>
      {/* {tagConfig[records[0].status]} */}
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
