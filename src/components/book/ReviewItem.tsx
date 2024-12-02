// import type { Review } from '@src/types/apis/record';
import styled from 'styled-components';
import { BookImg, TextEllipsis } from '@src/styles/mixins';
import Chip from '@src/components/common/Chip';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

type ReviewItemProps<
  T extends { title: string; author: string; coverImg: string },
> = {
  bookInfo: T;
  star: number;
  reviewContent: string;
};

const ReviewItem = <
  T extends { title: string; author: string; coverImg: string },
>({
  bookInfo,
  star,
  reviewContent,
}: ReviewItemProps<T>) => {
  const { title, author, coverImg } = bookInfo;

  return (
    <ComponentWrapper>
      <Img src={coverImg} alt='책 표지' loading='lazy' />
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
  background-color: ${({ theme }) => theme.colors.white};
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
