import MountainImage from '@src/components/library/MountainImage';
import Header from '@src/components/common/Header';
import styled from 'styled-components';
import IconButton from '@src/components/library/IconButton';
import { ReactComponent as SearchIcon } from '@src/assets/icons/md_outline_search.svg';
import { ReactComponent as BookmarkIcon } from '@src/assets/icons/md_collection_bookmark.svg';
import { ReactComponent as StarIcon } from '@src/assets/icons/md_star.svg';
import { useGetProfile } from '@src/hooks/query/member';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';

const seasonalColors = {
  december: ['#228B22', '#E8F1F8', '#FFF'],
  spring: ['#A8D5BA', '#D8F5A2', '#86C988'],
  summer: ['#2C5F2D', '#4CA1A3', '#299DBA'],
  autumn: ['#F2C14E', '#F89B00', '#E07A00'],
  winter: ['#C2DFFF', '#E8F1F8', '#9FCFEF'],
};

const LibraryHomePage = () => {
  const { memberId: id } = useParams<{ memberId: string }>();
  const memberId = id ? Number(id) : 'me';
  const { profileData } = useGetProfile(memberId);
  const navigate = useNavigate();

  const season = 'spring';
  const exp = [
    { text: '지나온 길(m)', value: profileData?.totalHeight },
    { text: '읽어낸 책(p)', value: profileData?.totalPage },
  ];
  const mountainData = {
    mountainHeight: 300,
    height: profileData?.totalHeight,
    profileImg: profileData?.profileImg,
    profileName: profileData?.nickname,
  };
  const tier = `⛰️ Lv ${profileData?.level} • ${profileData?.mountain} ${mountainData.mountainHeight}m`;

  const handleButton = (text: string) => {
    navigate(text);
  };

  return (
    <>
      <Header text='서재' headerType='hamburger' />
      <Main>
        <TierContainer>{tier}</TierContainer>
        <MountainImage
          mountainData={
            mountainData as {
              mountainHeight: number;
              height?: number;
              profileImg?: string;
              profileName?: string;
            }
          }
          seasonalColor={seasonalColors[season]}
        />
        <MountainMenu seasonalColor={seasonalColors[season][0]}>
          <ButtonContainer>
            {memberId && (
              <>
                <IconButton
                  onClick={() => handleButton(ROUTE_PATH.libraryBookSearch)}
                  Icon={SearchIcon}
                  text='책 검색'
                />
                <IconButton
                  onClick={() => handleButton(ROUTE_PATH.libraryRecord)}
                  Icon={BookmarkIcon}
                  text='책 기록'
                />
                <IconButton
                  onClick={() => handleButton(ROUTE_PATH.libraryReview)}
                  Icon={StarIcon}
                  text='책 평가'
                />
              </>
            )}
          </ButtonContainer>
          <ExpContainer>
            {exp.map((item) => (
              <ExpBox key={item.text}>
                <TypographyNumber>{item.value}</TypographyNumber>
                <TypographyText>{item.text}</TypographyText>
              </ExpBox>
            ))}
          </ExpContainer>
        </MountainMenu>
      </Main>
    </>
  );
};
export default LibraryHomePage;

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 4.375rem);
`;
const MountainMenu = styled.div<{ seasonalColor: string }>`
  background-color: ${({ seasonalColor }) => seasonalColor};
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 1.25rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  width: 100%;
`;
const ExpContainer = styled.div`
  display: flex;
  padding: 1.88rem 2.5rem;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: 1.3125rem;
`;
const ExpBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TypographyNumber = styled.span`
  ${({ theme }) => theme.fonts.mountain};
`;
const TypographyText = styled.span`
  ${({ theme }) => theme.fonts.mountain};
  color: ${({ theme }) => theme.colors.neutral400};
`;
const TierContainer = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.lime300};
  border-radius: 6.1875rem;
  padding: 0.625rem;
  ${({ theme }) => theme.fonts.body};

  top: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;
