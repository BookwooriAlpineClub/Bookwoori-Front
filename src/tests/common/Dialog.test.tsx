import { screen, fireEvent } from '@testing-library/react';
import useModal from '@src/hooks/useModal';
import { dialogState } from '@src/states/atoms';
import Dialog from '@src/components/common/Dialog';

const App = () => {
  const { openModal: openDialog, closeModal: closeDialog } = useModal(dialogState);
  const ConfirmDialog: React.ReactNode = (
    <button
	  data-testid='dialog-close'
	  type='button'
	  onClick={closeDialog}
	>
      취소
    </button>
  );
  return (
    <button
      data-testid='dialog-open'
      type='button'
      onClick={() => openDialog(ConfirmDialog)}
    >
      버튼
    </button>
  );
};

describe('Dialog', () => {
  beforeEach(() => {
    // <div id="modal"></div> 생성
    const modal = document.createElement('div');
    modal.id = 'modal';
    document.body.appendChild(modal);
    // 웹앱 렌더
    render(
      <>
        <App />
        <Dialog />
      </>,
    );
    // 다이얼로그 열기
    const openBtn = screen.getByTestId('dialog-open');
    fireEvent.click(openBtn);
  });
  test('openDialog()로 열고, closeDialog()로 닫아야 한다.', () => {
    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();

    const closeBtn = screen.getByTestId('dialog-close');
    fireEvent.click(closeBtn);

    setTimeout(() => expect(dialog).not.toBeInTheDocument(), 300);
  });
  test('openDialog()로 전달한 요소를 렌더해야 한다.', () => {
    const closeBtn = screen.getByTestId('dialog-close');

    expect(closeBtn).toBeInTheDocument();
  });
  test('Scrim을 클릭하면 닫혀야 한다.', () => {
    const dialog = screen.getByLabelText('dialog');

    const scrim = screen.getByLabelText('scrim');
    fireEvent.click(scrim);

    setTimeout(() => expect(dialog).not.toBeInTheDocument(), 300);
  });
});
