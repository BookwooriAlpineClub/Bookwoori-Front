import useModal from '@src/hooks/useModal';
import { useSetRecoilState } from 'recoil';
import { bottomsheetState } from '@src/states/atoms';

const useBottomsheet = () => {
  const setBottomsheet = useSetRecoilState(bottomsheetState);

  const { openModal, closeModal } = useModal(setBottomsheet, 300);
  const openBottomsheet = openModal;
  const closeBottomsheet = closeModal;

  return { openBottomsheet, closeBottomsheet };
};

export default useBottomsheet;
