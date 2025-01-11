import type { ReviewListitemQueryRes } from '@src/types/apis/record';
import { ROUTE_PATH } from '@src/constants/routePath';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import styled from 'styled-components';
import { BookImg, TextEllipsis } from '@src/styles/mixins';
import Chip from '@src/components/common/Chip';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

type Props = Omit<ReviewListItem, 'recordId' | 'memberId'> & {
  recordId?: ReviewListItem['recordId'];
};

const ReviewItem = ({ recordId, star, reviewContent, bookInfo }: Props) => {
  const navigate = useEncodedNavigate();
  const { title, author, cover } = bookInfo;

  const handleItemClick = () => {
    if (recordId) navigate(ROUTE_PATH.libraryRecord, recordId);
  };

  return (
    <ComponentWrapper as='li' onClick={handleItemClick}>
      <Img src={cover} alt='책 표지' loading='lazy' />
      <TextWrapper>
        <RowLayout>
          <Title $line={1}>{title}</Title>
          <Chip Icon={IcnStar} text={star} />
        </RowLayout>
        <Author $line={1}>{author}</Author>
        <ReviewContent $line={3}>{reviewContent}</ReviewContent>
      </TextWrapper>
    </ComponentWrapper>
  );
};

export default ReviewItem;

const RowLayout = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const ComponentWrapper = styled(RowLayout)`
  gap: 0.625rem;

  padding: 0.9375rem;

  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const TextWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.3rem;

  width: 100%;
`;
const Img = styled.img`
  width: 4.25rem;

  ${BookImg}
`;
const Title = styled.span<{ $line: number }>`
  width: 100%;

  ${({ theme }) => theme.fonts.body}
  ${TextEllipsis}
`;
const Author = styled.span<{ $line: number }>`
  width: 100%;

  ${({ theme }) => theme.fonts.caption}
  ${TextEllipsis}
`;
const ReviewContent = styled.p<{ $line: number }>`
  width: 100%;

  ${({ theme }) => theme.fonts.body}
  ${TextEllipsis}
`;
