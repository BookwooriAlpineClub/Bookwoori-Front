import { screen, fireEvent } from '@testing-library/react';
import useDialog from '@src/hooks/useDialog';
import Dialog from '@src/components/common/Dialog';

window.scrollTo = jest.fn();

const App = () => {
  const { openDialog, closeDialog } = useDialog();
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
  test('openDialog()로 전달한 요소가 다이얼로그의 children이어야 하고, 이를 렌더해야 한다.', () => {
    const dialog = screen.getByRole('dialog');
    const closeBtn = screen.getByTestId('dialog-close');

    dialog.childNodes.forEach((children) => {
      expect(children).toBe(closeBtn);
      expect(children).toBeInTheDocument();
    });
  });
});
