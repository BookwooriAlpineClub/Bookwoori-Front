import ClimbingDescription from '@src/components/climbing/ClimbingDescription';
import styled from 'styled-components';
import ReviewShareComponent from '@src/components/climbing/ReviewShareComponent';
import { Avatar, Rating, Stack } from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import useBottomsheet from '@src/hooks/useBottomsheet';
import EmojiList from '@src/components/climbing/EmojiList';

const reviews = [
  {
    memberId: 5,
    nickname: 'JJ',
    star: 5,
    reviewId: 1,
    content:
      '누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
    reviewEmojiList: [
      { emoji: '👍', emojiCount: 1 },
      { emoji: '❤️', emojiCount: 1 },
    ],
  },
  {
    memberId: 1,
    nickname: '김멤버',
    star: 4.5,
    reviewId: 2,
    content:
      '누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
    reviewEmojiList: [{ emoji: '🥲', emojiCount: 2 }],
  },
  {
    memberId: 2,
    nickname: '박멤버!! ',
    star: 4.5,
    reviewId: 2,
    content:
      '누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
    reviewEmojiList: [{ emoji: '🥲', emojiCount: 2 }],
  },
];

const ReviewBoard = () => {
  const { openBottomsheet } = useBottomsheet();

  const hasShared = false;
  const isAllowed = true;
  return (
    <Container>
      <ClimbingDescription />
      <ReviewListContainer>
        {hasShared ? (
          <ReviewList>
            {reviews.map((review) => (
              <ReviewItem key={review.reviewId}>
                <StyledAvatar>{review.nickname.charAt(0)}</StyledAvatar>
                <ReviewBox>
                  <NicknameContainer>
                    {review.nickname}
                    <StyledRating
                      value={review.star}
                      precision={0.5}
                      readOnly
                    />
                  </NicknameContainer>
                  <ContentContainer>{review.content}</ContentContainer>
                  <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
                    {review.reviewEmojiList.map((emoji) => (
                      <EmojiButton key={emoji.emoji} type='button'>
                        <p>{emoji.emoji}</p>
                        <p>{emoji.emojiCount}</p>
                      </EmojiButton>
                    ))}
                    <EmojiButton
                      type='button'
                      onClick={() =>
                        openBottomsheet(
                          <EmojiList
                            reviewEmojiList={review.reviewEmojiList}
                          />,
                        )
                      }
                    >
                      <StyledAddReactionIcon />
                    </EmojiButton>
                  </Stack>
                </ReviewBox>
              </ReviewItem>
            ))}
          </ReviewList>
        ) : (
          <ReviewShareComponent isAllowed={isAllowed} />
        )}
      </ReviewListContainer>
    </Container>
  );
};

export default ReviewBoard;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: calc(100% - 4.375rem);
  gap: 0.625rem;
`;

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.9375rem;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 0.12rem ${({ theme }) => theme.colors.black400};
  min-height: 24rem;
  overflow-y: scroll;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const ReviewItem = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.625rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.header};
`;

const ContentContainer = styled.div`
  display: flex;
  text-align: justify;
  ${({ theme }) => theme.fonts.caption};
`;

const EmojiButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.325rem;
  gap: 0.325rem;
  background-color: ${({ theme }) => theme.colors.black300};
  border: solid 0.0625rem ${({ theme }) => theme.colors.black400};
  border-radius: 0.225rem;
  ${({ theme }) => theme.fonts.caption};
`;

const StyledRating = styled(Rating)`
  ${({ theme }) => theme.fonts.body};

  & .MuiRating-iconFilled {
    color: ${({ theme }) => theme.colors.neonGreen}; /* 채워진 별 색상 */
  }

  & .MuiRating-iconEmpty {
    color: ${({ theme }) => theme.colors.black200}; /* 채워진 별 색상 */
  }
`;

const StyledAvatar = styled(Avatar)``;

const StyledAddReactionIcon = styled(AddReactionIcon)`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black100};
`;
