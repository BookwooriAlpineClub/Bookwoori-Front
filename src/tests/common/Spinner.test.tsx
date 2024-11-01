import { render, screen } from '@testing-library/react';
import Spinner from '@src/components/common/Spinner';

describe('Spinner', () => {
  test('마운트되어야 한다.', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });
  test('계속 빙글빙글 돌아야 한다.', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    const spinnerStyle = getComputedStyle(spinner);

    expect(spinnerStyle.animation).toBe('spin 1.3s ease infinite');
  });
});
