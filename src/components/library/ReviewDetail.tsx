import type Review from '@src/types/review';
import styled from 'styled-components';
import Section from '@src/components/common/Section';
import StarReview from '@src/components/library/StarReview';
import { ReactComponent as HiOutlinePencil } from '@src/assets/icons/hi_outline_pencil.svg';
import { ReactComponent as FiTrash2 } from '@src/assets/icons/fi_trash_2.svg';

interface Props extends Review {
  openBottomsheet: () => void;
}

const ReviewDetail = ({
  star,
  content,
  createdAt,
  modifiedAt,
  openBottomsheet,
}: Props) => {
  return (
    <Section>
      <Container>
        <TopWrapper>
          <StarReview starReview={star} />
          <ButtonWrapper>
            <button type='button' onClick={openBottomsheet}>
              <HiOutlinePencil />
            </button>
            <button type='button' onClick={openBottomsheet}>
              <FiTrash2 />
            </button>
          </ButtonWrapper>
        </TopWrapper>
        <Body>{content}</Body>
        <Caption>{`${createdAt} 작성 (${modifiedAt} 수정)`}</Caption>
      </Container>
    </Section>
  );
};

export default ReviewDetail;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[10]};
`;
const TopWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: ${({ theme }) => theme.gap[16]};
`;
const Body = styled.p`
  ${({ theme }) => theme.fonts.body}
`;
const Caption = styled.span`
  margin-left: auto;

  ${({ theme }) => theme.fonts.caption}
`;
