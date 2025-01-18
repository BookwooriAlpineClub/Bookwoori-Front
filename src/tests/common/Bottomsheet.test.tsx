import { screen, fireEvent } from '@testing-library/react';
import useBottomsheet from '@src/hooks/useBottomsheet';
import Bottomsheet from '@src/components/common/modal/Bottomsheet';

const App = () => {
  const { openBottomsheet, closeBottomsheet } = useBottomsheet();
  const ConfirmBottomsheet: React.ReactNode = (
    <button
      data-testid='bottomsheet-close'
      type='button'
      onClick={closeBottomsheet}
    >
      취소
    </button>
  );
  return (
    <button
      data-testid='bottomsheet-open'
      type='button'
      onClick={() => openBottomsheet(ConfirmBottomsheet)}
    >
      버튼
    </button>
  );
};

describe('Bottomsheet', () => {
  beforeEach(() => {
    // <div id="modal"></div> 생성
    const modal = document.createElement('div');
    modal.id = 'modal';
    document.body.appendChild(modal);
    // 웹앱 렌더
    render(
      <>
        <App />
        <Bottomsheet />
      </>,
    );
    // 바텀시트 열기
    const openBtn = screen.getByTestId('bottomsheet-open');
    fireEvent.click(openBtn);
  });
  test('openBottomsheet()로 열고, closeBottomsheet()로 닫아야 한다.', () => {
    const bottomsheet = screen.getByLabelText('bottomsheet');

    expect(bottomsheet).toBeInTheDocument();

    const closeBtn = screen.getByTestId('bottomsheet-close');
    fireEvent.click(closeBtn);

    setTimeout(() => expect(bottomsheet).not.toBeInTheDocument(), 300);
  });
  test('openBottomsheet()로 전달한 요소를 렌더해야 한다.', () => {
    const closeBtn = screen.getByTestId('bottomsheet-close');

    expect(closeBtn).toBeInTheDocument();
  });
  test('Scrim을 클릭하면 닫혀야 한다.', () => {
    const bottomsheet = screen.getByLabelText('bottomsheet');

    const scrim = screen.getByLabelText('scrim');
    fireEvent.click(scrim);

    setTimeout(() => expect(bottomsheet).not.toBeInTheDocument(), 300);
  });
});
