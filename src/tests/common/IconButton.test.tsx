import { fireEvent, screen } from '@testing-library/react';
import renderWithProviders from '@src/tests/utils/renderWithProvider.setup';
import CommunityButton, {
  CommunityButtonType,
} from '@src/components/common/IconButton';

describe('CommunityButton', () => {
  const buttonTypes: {
    type: CommunityButtonType;
    name: string;
    iconAltText: string;
  }[] = [
    {
      type: 'transferAuthority',
      name: '공동체 권한 넘기기',
      iconAltText: '공동체 권한 넘기기 icon',
    },
    {
      type: 'deleteCommunity',
      name: '공동체 삭제하기',
      iconAltText: '공동체 삭제하기 icon',
    },
    {
      type: 'leaveCommunity',
      name: '공동체 나가기',
      iconAltText: '공동체 나가기 icon',
    },
    {
      type: 'copyInvitation',
      name: '초대 링크 복사하기',
      iconAltText: '초대 링크 복사하기 icon',
    },
    {
      type: 'detailInfoSetting',
      name: '상세 정보 설정',
      iconAltText: '상세 정보 설정 icon',
    },
  ];
  buttonTypes.forEach(({ type, name, iconAltText }) => {
    test(`${name} 버튼을 렌더링한다.`, () => {
      renderWithProviders(<CommunityButton type={type} testId={type} />);
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByAltText(iconAltText)).toBeInTheDocument();
      expect(screen.getByTestId(type)).toBeInTheDocument();
    });
  });
  test('버튼을 클릭했을 때 onClick 이벤트를 호출한다.', () => {
    const mockOnClick = jest.fn();
    // 대표로 transferAuthority 타입 버튼을 테스트한다.
    renderWithProviders(
      <CommunityButton type='transferAuthority' onClick={mockOnClick} />,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
