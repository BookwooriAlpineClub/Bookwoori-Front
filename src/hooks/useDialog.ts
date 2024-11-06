import useModal from '@src/hooks/useModal';
import { useSetRecoilState } from 'recoil';
import { dialogState } from '@src/states/atoms';

const useDialog = () => {
  const setDialog = useSetRecoilState(dialogState);

  const { openModal, closeModal } = useModal(setDialog, 300);
  const openDialog = openModal;
  const closeDialog = closeModal;

  return { openDialog, closeDialog };
};

export default useDialog;
