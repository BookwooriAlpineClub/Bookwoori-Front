import { ReactComponent as IconStar } from '@src/assets/icons/md_star.svg';
import Tag from '@src/components/common/Tag';
import styled from 'styled-components';
import UserAvatar from '@src/components/common/UserAvatar';
import EmojiList from '@src/components/common/emoji/EmojiList';
import { EmojiType } from '@src/constants/constants';
import { bottomsheetState } from '@src/states/atoms';
import useModal from '@src/hooks/useModal';
import EmojiBottomSheet from '@src/components/climbing/EmojiBottomSheet';

interface ReviewItemProps {
  climbingId: number;
  review: {
    reviewId: number;
    memberId: number;
    nickname: string;
    star: number;
    profileImg: string | null;
    content: string;
    reviewEmojiList: { emoji: keyof typeof EmojiType; emojiCount: number }[];
  };
}

const ReviewItem = ({ climbingId, review }: ReviewItemProps) => {
  const { openModal } = useModal(bottomsheetState);

  const handleOpenBottomSheet = () => {
    openModal(
      <EmojiBottomSheet climbingId={climbingId} reviewId={review.reviewId} />,
    );
  };

  return (
    <ReviewItemWrapper>
      <UserAvatar
        profileImg={review.profileImg}
        nickname={review.nickname}
        status='FINISHED' // 임시 상태
      />
      <ReviewContent>
        <UserInfo>
          {review.nickname}
          <Tag Icon={IconStar} text={review.star} color='blue' />
        </UserInfo>
        <span>{review.content}</span>
        <EmojiList
          reviewId={review.reviewId}
          emojis={review.reviewEmojiList}
          onAddClick={handleOpenBottomSheet}
        />
      </ReviewContent>
    </ReviewItemWrapper>
  );
};

export default ReviewItem;

const ReviewItemWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap['12']};
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap['8']};
  color: ${({ theme }) => theme.colors.neutral950};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.header};
  color: ${({ theme }) => theme.colors.neutral950};
`;
