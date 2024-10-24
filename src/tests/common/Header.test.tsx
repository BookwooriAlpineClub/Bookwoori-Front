import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from '../../components/common/Header/Header';

describe('헤더(공통) 컴포넌트 단위 테스트', () => {
  test('props로 헤더 text를 전달하면 text가 렌더되어야 한다.', () => {
    const headerText = '헤더 제목';
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path='/'
            element={<Header text='헤더 제목' headerType='hamburger' />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const expectText = screen.getByText(headerText);
    expect(expectText).toBeInTheDocument();
  });

  //   test('type === back인 경우 버튼을 눌렀을 때 뒤로 가기가 실행되어야 한다.', () => {
  //     const mockNavigate = useNavigate();
  //     const mockNavigate = jest.mock('react-router-dom', () => ({
  //       ...jest.requireActual('react-router-dom'),
  //       useNavigate: () => mockNavigate,
  //       Navigate: jest.fn(() => null),
  //     }));

  //     const type = 'back';
  //     render(
  //       <MemoryRouter>
  //         <Routes>
  //           <Route path='/' element={<Header text='헤더 제목' type={type} />} />
  //         </Routes>
  //       </MemoryRouter>,
  //     );

  //     const button = screen.getByRole('button', { name: /back/ });
  //     fireEvent.click(button);

  //     expect(mockNavigate).toHaveBeenCalledWith(-1);
  //   });

  // 추후 테스트 진행
  test('type === hamburger인 경우 버튼을 눌렀을 때 서버바가 나타나야 한다.', () => {});
});
