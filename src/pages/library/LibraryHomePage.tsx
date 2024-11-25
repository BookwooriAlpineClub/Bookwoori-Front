import MountainImage from '@src/components/library/MountainImage';
import Header from '@src/components/common/Header';
import styled from 'styled-components';
import BookButton from '@src/components/library/BookButton';
import { ReactComponent as SearchIcon } from '@src/assets/icons/md_outline_search.svg';
import { ReactComponent as BookmarkIcon } from '@src/assets/icons/md_collection_bookmark.svg';
import { ReactComponent as StarIcon } from '@src/assets/icons/md_star.svg';

const seasonalColors = {
  default: ['#C1E1C1', '#D1FD57', '#A5D900'], // 부드러운 라임 그린 추가
  spring: ['#A8D5BA', '#D8F5A2', '#86C988'], // 은은한 초록빛 추가
  summer: ['#2C5F2D', '#4CA1A3', '#299DBA'], // 차분한 청록색 추가
  autumn: ['#F2C14E', '#F89B00', '#E07A00'], // 부드러운 오렌지톤 추가
  winter: ['#C2DFFF', '#E8F1F8', '#9FCFEF'], // 차분한 하늘색 추가
};

const LibraryHomePage = () => {
  const season = 'winter';

  const exp = [
    { text: '지나온 길(m)', value: 500 },
    { text: '읽어낸 책(p)', value: 4000 },
  ];

  return (
    <>
      <Header text='서재' headerType='hamburger' />
      <MountainContainer>
        <TierContainer>⛰️ Lv 3. 북한산 750m</TierContainer>
        <MountainImage seasonalColor={seasonalColors[season]} />
        <MountainMenu seasonalColor={seasonalColors[season][0]}>
          <ButtonContainer>
            <BookButton icon={<SearchIcon />} text='책 검사' />
            <BookButton icon={<BookmarkIcon />} text='책 기록' />
            <BookButton icon={<StarIcon />} text='책 평가' />
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
      </MountainContainer>
    </>
  );
};
export default LibraryHomePage;

const MountainContainer = styled.div`
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
  background-color: ${({ theme }) => theme.colors.white};
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
  color: ${({ theme }) => theme.colors.black200};
`;

const TierContainer = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.blue300};
  border-radius: 6.1875rem;
  padding: 0.625rem;
  ${({ theme }) => theme.fonts.body};

  top: 1.2rem;
  left: 1.2rem;
`;
