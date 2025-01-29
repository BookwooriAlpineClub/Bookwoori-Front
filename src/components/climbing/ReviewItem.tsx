import { ReactComponent as IconStar } from '@src/assets/icons/md_star.svg';
import Tag from '@src/components/common/Tag';
import styled from 'styled-components';

interface ReviewItemProps {
  review: {
    reviewId: number;
    nickname: string;
    star: number;
    profileImg: string;
    content: string;
    reviewEmojiList: { emoji: string; emojiCount: number }[];
  };
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <ReviewItemWrapper>
      <ImageWrapper>
        <img src={review.profileImg} alt={`${review.nickname}`} />
      </ImageWrapper>
      <ReviewBox>
        <NicknameContainer>
          {review.nickname}
          <Tag Icon={IconStar} text={review.star} color='blue' />
        </NicknameContainer>
        <ContentContainer>{review.content}</ContentContainer>
        {review.reviewEmojiList.map((emoji) => (
          <EmojiButton key={emoji.emoji} type='button'>
            <p>{emoji.emoji}</p>
            <p>{emoji.emojiCount}</p>
          </EmojiButton>
        ))}
        <EmojiButton
          type='button'
          onClick={() => {
            console.log('open bottomsheet');
          }}
        >
          add reaction btn
        </EmojiButton>
      </ReviewBox>
    </ReviewItemWrapper>
  );
};

export default ReviewItem;

const ReviewItemWrapper = styled.div`
    display: flex;
    gap: 0.625rem;
    padding: 0.9375rem;

    align-items: flex-start;

    width: 100%;
    background-color: ${({ theme }) => theme.colors.blue500};
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
