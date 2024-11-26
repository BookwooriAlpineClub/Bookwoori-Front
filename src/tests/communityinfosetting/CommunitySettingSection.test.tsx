import { screen } from '@testing-library/react';
import CommunitySettingSection from '@src/components/communityinfosetting/CommunitySettingSection';
import renderWithProviders from '@src/tests/utils/renderWithProvider.setup';

describe('CommunitySettingSection', () => {
  test('관리자 역할일 때 권한 넘기기 & 삭제하기 옵션을 렌더링한다.', () => {
    renderWithProviders(<CommunitySettingSection communityRole='admin' />);
    // role 기반 검증
    expect(
      screen.getByRole('button', { name: '공동체 권한 넘기기' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '공동체 삭제하기' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '공동체 나가기' }),
    ).not.toBeInTheDocument();
    // id 기반 검증
    expect(screen.getByTestId('transfer-authority-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-community-button')).toBeInTheDocument();
    expect(
      screen.queryByTestId('leave-community-button'),
    ).not.toBeInTheDocument();
  });
  test('일반 사용자 역할일 때 나가기 옵션을 렌더링한다.', () => {
    renderWithProviders(<CommunitySettingSection communityRole='user' />);
    // role 기반 검증
    expect(
      screen.getByRole('button', { name: '공동체 나가기' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '공동체 권한 넘기기' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '공동체 삭제하기' }),
    ).not.toBeInTheDocument();
    // id 기반 검증
    expect(screen.getByTestId('leave-community-button')).toBeInTheDocument();
    expect(
      screen.queryByTestId('transfer-authority-button'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('delete-community-button'),
    ).not.toBeInTheDocument();
  });
});
