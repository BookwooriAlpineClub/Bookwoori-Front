import type { Review } from '@src/types/apis/record';
import styled, { css } from 'styled-components';
import Chip from '@src/components/common/Chip';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

const ReviewItem = ({ bookInfo, star, reviewContent }: Review) => {
  const { title, author, cover } = bookInfo;

  return (
    <ComponentWrapper>
      <Img src={cover} alt='책 표지' loading='lazy' />
      <TextWrapper>
        <RowLayout>
          <Title>{title}</Title>
          <Chip>
            <IcnStar width={12} height={13} />
            {star}
          </Chip>
        </RowLayout>
        <Author>{author}</Author>
        <ReviewContent>{reviewContent}</ReviewContent>
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
  flex-shrink: 0;

  width: 4.25rem;

  object-fit: contain;
`;
const TextEllipsis = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  width: 100%;

  text-overflow: ellipsis;
`;
const Title = styled.span`
  ${({ theme }) => theme.fonts.body}
  ${TextEllipsis}
  -webkit-line-clamp: 1;
`;
const Author = styled.span`
  ${({ theme }) => theme.fonts.caption}
  ${TextEllipsis}
  -webkit-line-clamp: 1;
`;
const ReviewContent = styled.p`
  ${({ theme }) => theme.fonts.body}
  ${TextEllipsis}
  -webkit-line-clamp: 3;
`;
