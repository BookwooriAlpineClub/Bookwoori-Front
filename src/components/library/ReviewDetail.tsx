import type Review from '@src/types/review';
import useModal from '@src/hooks/useModal';
import { useDeleteReview } from '@src/hooks/query/review';
import { dialogState } from '@src/states/atoms';
import { formatDate } from '@src/utils/formatters';
import styled from 'styled-components';
import Section from '@src/components/common/Section';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';
import StarReview from '@src/components/library/StarReview';
import { ReactComponent as HiOutlinePencil } from '@src/assets/icons/hi_outline_pencil.svg';
import { ReactComponent as FiTrash2 } from '@src/assets/icons/fi_trash_2.svg';

interface Props extends Review {
  openBottomsheet: () => void;
}

const ReviewDetail = ({
  reviewId,
  star,
  content,
  createdAt,
  modifiedAt,
  openBottomsheet,
}: Props) => {
  const { openModal: openDialog, closeModal: closeDialog } =
    useModal(dialogState);
  const { mutate: deleteReview } = useDeleteReview(reviewId);
  const handleDeleteClick = () => {
    openDialog(
      <DeleteConfirmDialog
        onClickDelete={deleteReview}
        closeDialog={closeDialog}
      />,
    );
  };

  return (
    <Section>
      <Container>
        <TopWrapper>
          <StarReview starReview={star} />
          <ButtonWrapper>
            <Button type='button' onClick={openBottomsheet}>
              <HiOutlinePencil width={20} height={20} />
            </Button>
            <Button type='button' onClick={handleDeleteClick}>
              <FiTrash2 width={20} height={20} />
            </Button>
          </ButtonWrapper>
        </TopWrapper>
        <Body>{content}</Body>
        <Caption>{`${formatDate(new Date(createdAt), '$1.$2.$3')} 작성 (${formatDate(new Date(modifiedAt), '$1.$2.$3.')} 수정)`}</Caption>
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
const Button = styled.button`
  display: flex;

  color: ${({ theme }) => theme.colors.blue500};
`;
const Body = styled.p`
  ${({ theme }) => theme.fonts.body}
`;
const Caption = styled.span`
  margin-left: auto;

  ${({ theme }) => theme.fonts.caption}
`;
