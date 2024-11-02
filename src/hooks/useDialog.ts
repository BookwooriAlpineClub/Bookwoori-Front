import { useSetRecoilState } from 'recoil';
import { dialogState } from '@src/states/atoms';

const useDialog = () => {
  const setDialog = useSetRecoilState(dialogState);

  const openDialog = (content: React.ReactNode): void => {
    setDialog((prev) => {
      return { ...prev, isOpen: true, content };
    });
    setTimeout(
      () =>
        setDialog((prev) => {
          return { ...prev, transition: 'open' };
        }),
      30,
    );
  };

  const closeDialog = (): void => {
    setDialog((prev) => {
      return { ...prev, transition: 'close' };
    });
    setTimeout(
      () =>
        setDialog((prev) => {
          return { ...prev, isOpen: false, content: '' };
        }),
      300,
    );
  };

  return { openDialog, closeDialog };
};

export default useDialog;
