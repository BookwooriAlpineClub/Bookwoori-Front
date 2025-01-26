import Header from '@src/components/common/Header';
import styled from 'styled-components';
import AddCommunityButton from '@src/components/addcommunity/AddCommunityButton';
import { useNavigate } from 'react-router-dom';
import IntroSection from '@src/components/addcommunity/IntroSection';
import { ROUTE_PATH } from '@src/constants/routePath';

const headerText = '공동체 추가';
const headerType = 'hamburger';
const introTitleText = '공동체를 만들어보세요.';
const introBodyLines = [
  { text: '공동체는 나와 친구들이 함께 어울리는 공간입니다.' },
  { text: '내 공동체를 만들고 공동체를 시작해보세요.' },
];

const buttonConfig = [
  {
    name: '새로운 공동체 생성하기',
    path: ROUTE_PATH.createServer,
  },
  {
    name: '기존 공동체에 참여하기',
    path: ROUTE_PATH.invitationCode,
  },
];

const AddCommunityPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header text={headerText} headerType={headerType} />
      <Container>
        <IntroSection title={introTitleText} bodyLines={introBodyLines} />
        <AddOptionContainer>
          {buttonConfig.map((button, idx) => (
            <AddCommunityButton
              key={idx}
              name={button.name}
              onClick={handleButtonClick(button.path)}
            />
          ))}
        </AddOptionContainer>
      </Container>
    </>
  );
};

export default AddCommunityPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.94rem;
  padding: 1.87rem 1.25rem;
  width: 100%;
  min-height: calc(100vh - 4.375em);
  min-height: calc(100svh - 4.375rem);

  background-color: ${({ theme }) => theme.colors.neutral50};
`;

const AddOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;
