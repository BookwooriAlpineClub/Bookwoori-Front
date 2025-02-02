import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/styles/theme';
import Button from '@src/components/common/button/Button';

describe('버튼(공통) 컴포넌트 단위 테스트', () => {
  test('props에 "text"를 넣으면 button에 text가 렌더되어야 한다.', () => {
    const buttonText = '클릭하세요';
    render(
      <ThemeProvider theme={theme}>
        <Button>{buttonText}</Button>
      </ThemeProvider>,
    );

    const expectText = screen.getByText(buttonText);
    expect(expectText).toBeInTheDocument();
  });

  test('disabled = true가 기본 값으로 버튼 클릭 시, onClick에 연결된 함수가 실행되면 안 된다.', () => {
    const onClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Button onClick={onClick}>클릭하세요</Button>
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('disabled = false인 경우 버튼이 활성화되고 버튼 클릭 시, onClick에 연결된 함수가 실행되어야 한다.', () => {
    const disabled = false;
    const onClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Button disabled={disabled} onClick={onClick}>
          클릭하세요
        </Button>
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toBeEnabled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
