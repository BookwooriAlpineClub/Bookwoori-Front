import styled from 'styled-components';
import SubButton from '@src/components/common/button/SubButton';

const NOTI_TEXT = `삭제한 정보는 복구할 수 없습니다.\n정말 삭제하시겠습니까?`;

interface DeleteConfirmDialogProps {
  text?: string;
  deleteLabel?: string;
  closeDialog: () => void;
  onClickDelete: () => void;
}

const DeleteConfirmDialog = ({
  text,
  deleteLabel = '삭제하기',
  closeDialog,
  onClickDelete,
}: DeleteConfirmDialogProps) => {
  return (
    <DialogLayout>
      <TextContainer>{text ?? NOTI_TEXT}</TextContainer>
      <ButtonContainer>
        <SubButton label={deleteLabel} onClick={onClickDelete} />
        <SubButton label='돌아가기' onClick={closeDialog} />
      </ButtonContainer>
    </DialogLayout>
  );
};

export default DeleteConfirmDialog;

const DialogLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[16]};

  @media (max-width: 375px) {
    width: 80%;
  }
  @media (min-width: 375px) {
    width: calc(375px * 0.8);
  }
`;
const TextContainer = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
  padding: 2.5rem 1.5rem;

  border-radius: 1.875rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  white-space: pre;
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: ${({ theme }) => theme.gap[16]};
`;
