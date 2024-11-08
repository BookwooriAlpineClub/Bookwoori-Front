import { screen } from '@testing-library/react';
import CommunityInfoSection from '@src/components/communityinfosetting/CommunityInfoSection';
import { CommunityInfoType } from '@src/pages/communityinfosetting/CommunityInfoSettingPage';
import renderWithProviders from '@src/tests/utils/renderWithProvider.setup';

describe('CommunityInfoSection', () => {
  const mockData: CommunityInfoType = {
    name: '피크민을 하자',
    memberInfo: '방장: 일이삼사오육칠팔구십 • 멤버 00명',
    creationDate: '2000.99.99',
    description:
      '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이' +
      '삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사' +
      '오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육' +
      '칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔' +
      '구십일이삼사오육칠팔구십',
    imageUrl: '/path/to/image.jpg',
  };

  test('공동체 이미지를 렌더링한다.', () => {
    renderWithProviders(<CommunityInfoSection {...mockData} />);
    const imageElement = screen.getByAltText(/profile/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockData.imageUrl);
  });

  test('공동체 이름을 렌더링한다.', () => {
    renderWithProviders(<CommunityInfoSection {...mockData} />);
    const nameElement = screen.getByText(mockData.name);
    expect(nameElement).toBeInTheDocument();
  });

  test('공동체 멤버 정보를 렌더링한다.', () => {
    renderWithProviders(<CommunityInfoSection {...mockData} />);
    const memberInfoElement = screen.getByText(mockData.memberInfo);
    expect(memberInfoElement).toBeInTheDocument();
  });

  test('공동체 생성 날짜를 렌더링한다.', () => {
    renderWithProviders(<CommunityInfoSection {...mockData} />);
    const creationDateElement = screen.getByText(mockData.creationDate);
    expect(creationDateElement).toBeInTheDocument();
  });

  test('공동체 설명을 렌더링한다.', () => {
    renderWithProviders(<CommunityInfoSection {...mockData} />);
    const descriptionElement = screen.getByText(mockData.description);
    expect(descriptionElement).toBeInTheDocument();
  });
});
