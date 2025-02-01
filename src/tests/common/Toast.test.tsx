import { screen, fireEvent } from '@testing-library/react';
import useToast from '@src/hooks/useToast';
import Toast from '@src/components/common/Toast';

const App = ({ toastContent }: { toastContent: string }) => {
  const addToast = useToast();
  return (
    <button type='button' onClick={() => addToast('info', toastContent)}>
      버튼
    </button>
  );
};
const text = '테스트';

describe('Toast', () => {
  beforeEach(() => {
    // <div id="toast"></div> 생성
    const container = document.createElement('div');
    container.id = 'toast';
    document.body.appendChild(container);
  });
  test('addToast 함수로 추가하면 즉시 마운트되고, 그로부터 4.5초가 지나면 언마운트되어야 한다.', () => {
    // 웹앱 렌더
    render(
      <>
        <App toastContent={text} />
        <Toast />
      </>,
    );
    // 토스트 추가
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // 테스트
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();
    setTimeout(() => expect(toast).not.toBeInTheDocument(), 4500);
  });
  test('toastState의 content값을 토스트의 텍스트로 가져야 한다.', () => {
    // 웹앱 렌더
    render(
      <>
        <App toastContent={text} />
        <Toast />
      </>,
    );
    // 토스트 추가
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // 테스트
    const toast = screen.getByRole('alert');
    expect(toast).toHaveTextContent(text);
  });
});
