import styled from 'styled-components';
import SubButton from '@src/components/common/SubButton';

const NOTI_TEXT = `삭제한 정보는 복구할 수 없습니다.\n정말 삭제하시겠습니까?`;

interface DeleteConfirmModalProps {
  text?: string;
  closeDialog: () => void;
  onClickDelete: () => void;
}

const DeleteConfirmModal = ({
  text,
  closeDialog,
  onClickDelete,
}: DeleteConfirmModalProps) => {
  return (
    <DialogLayout>
      <TextContainer>{text ?? NOTI_TEXT}</TextContainer>
      <ButtonContainer>
        <SubButton label='삭제하기' onClick={onClickDelete} width='39vw' />
        <SubButton label='돌아가기' width='39vw' onClick={closeDialog} />
      </ButtonContainer>
    </DialogLayout>
  );
};

export default DeleteConfirmModal;

const DialogLayout = styled.div`
  width: 80vw;
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
  justify-content: space-between;

  margin-top: 0.9375rem;
`;
