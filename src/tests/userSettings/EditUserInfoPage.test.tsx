import EditUserInfoPage from '@src/pages/userSettings/EditUserInfoPage';
import { theme } from '@src/styles/theme';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('handleChangeValue', () => {
  test('입력 길이가 20자 이하일 때 value와 length를 올바르게 업데이트해야 한다', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <EditUserInfoPage />
        </ThemeProvider>
      </BrowserRouter>,
    );
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '20글자 이하' } });
    expect(input.value).toBe('20글자 이하');
    expect(input.value.length).toBe(7);
  });

  test('입력 길이가 20자를 초과하면 value가 20자로 제한되어야 한다', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <EditUserInfoPage />
        </ThemeProvider>
      </BrowserRouter>,
    );
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: '20자를 초과하는 텍스트를 테스트 해보겠다' },
    });
    expect(input.value).toBe('20자를 초과하는 텍스트를 테스트 해');
    expect(input.value.length).toBe(20);
  });
});
