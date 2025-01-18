import ClimbingDescription from '@src/components/climbing/ClimbingDescription';
import styled from 'styled-components';
import ReviewShareComponent from '@src/components/climbing/ReviewShareComponent';
import { Stack } from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import useBottomsheet from '@src/hooks/useBottomsheet';
import EmojiList from '@src/components/climbing/EmojiList';
import { useQuery } from '@tanstack/react-query';
import { ClimbingResponse } from '@src/types/apis/climbing.d';
import { getClimbingReview } from '@src/apis/climbing';
import useLoaderData from '@src/hooks/useRoaderData';
import Chip from '@src/components/common/Tag';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

// const reviews = [
//   {
//     memberId: 5,
//     nickname: 'JJ',
//     star: 5,
//     reviewId: 1,
//     content:
//       '누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
//     reviewEmojiList: [
//       { emoji: '👍', emojiCount: 1 },
//       { emoji: '❤️', emojiCount: 1 },
//     ],
//   },
//   {
//     memberId: 1,
//     nickname: '김멤버',
//     star: 4.5,
//     reviewId: 2,
//     content:
//       '누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
//     reviewEmojiList: [{ emoji: '🥲', emojiCount: 2 }],
//   },
//   {
//     memberId: 2,
//     nickname: '박멤버!! ',
//     star: 4.5,
//     reviewId: 2,
//     content:
//       '누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다. 다만, 형사피고인이 스스로 변호인을 구할 수 없을 때에는 법률이 정하는 바에 의하여 국가가 변호인을 붙인다.',
//     reviewEmojiList: [{ emoji: '🥲', emojiCount: 2 }],
//   },
// ];

const ReviewBoard = () => {
  const { openBottomsheet } = useBottomsheet();
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { data, isLoading, isError } = useQuery<ClimbingResponse>({
    queryKey: ['climbingReview', climbingId],
    queryFn: () => getClimbingReview(climbingId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading reviews</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  console.log(data);
  /* eslint-disable */
  return (
    <Container>
      {data.hasShared && <ClimbingDescription />}
      <ReviewListContainer>
        {data.hasShared ? (
          <>
            {data.ClimbingMemberReviewList?.map((review) => (
              <ReviewItemWrapper key={review.reviewId}>
                <ImageWrapper>
                  <img
                    src={`${review.profileImg}`}
                    alt={`${review.nickname}`}
                  />
                </ImageWrapper>
                <ReviewBox>
                  <NicknameContainer>
                    {review.nickname}
                    <Chip Icon={IcnStar} text={review.star} />
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
              </ReviewItemWrapper>
            ))}
          </>
        ) : (
          <ReviewShareComponent {...data} />
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
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: solid 0.12rem ${({ theme }) => theme.colors.neutral200};
  min-height: 30rem;
  overflow-y: scroll;
`;

const ReviewItemWrapper = styled.div`
    display: flex;
    gap: 0.625rem;
    padding: 0.9375rem;

    align-items: flex-start;

    width: 100%;
    background-color: ${({ theme }) => theme.colors.blue300 + '10'};
    border: solid 0.05rem ${({ theme }) => theme.colors.blue300};
    border-radius: 0.2rem;
    box-shadow: 0 0 0.08rem ${({ theme }) => theme.colors.blue300};
/
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
  flex-flow: column;
  gap: 0.3rem;

  //width: 100%;
`;

const EmojiButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.325rem;
  gap: 0.325rem;
  background-color: ${({ theme }) => theme.colors.neutral50};
  border: solid 0.0625rem ${({ theme }) => theme.colors.neutral200};
  border-radius: 0.225rem;
  ${({ theme }) => theme.fonts.caption};
`;

const StyledAddReactionIcon = styled(AddReactionIcon)`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral950};
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
