import { EmojiType } from '@src/constants/constants';
import styled from 'styled-components';
import { getClimbingReviewEmojiRes } from '@src/types/apis/climbing';
import { useState } from 'react';
import UserAvatar from '@src/components/common/UserAvatar';

const EmojiMemberListBottomSheet = ({
  clickedEmoji = 'GOOD',
  emojiMembersData,
}: {
  clickedEmoji?: string;
  emojiMembersData?: getClimbingReviewEmojiRes;
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(clickedEmoji);
  const emojiKeys = Object.keys(EmojiType) as Array<keyof typeof EmojiType>;
  if (emojiMembersData === undefined) return null;
  const emojiData = emojiMembersData.reviewEmojiList.find(
    (item) => item.emoji === selectedEmoji,
  );
  return (
    <Layout>
      <Container>
        {emojiKeys.map((key) => (
          <Emoji
            key={key}
            isClicked={selectedEmoji === key}
            onClick={() => setSelectedEmoji(key)}
          >
            {EmojiType[key].value}
          </Emoji>
        ))}
      </Container>
      <MemberListWrapper>
        {emojiData ? (
          emojiData.reviewEmojiMemberList.map((item, idx) => (
            <MemberItemWrapper key={idx}>
              <UserAvatar
                profileImg={item.profileImg}
                nickname={item.nickname}
              />
              <p>{item.nickname}</p>
            </MemberItemWrapper>
          ))
        ) : (
          <MemberItemWrapper>반응을 남긴 사람이 없습니다.</MemberItemWrapper>
        )}
      </MemberListWrapper>
    </Layout>
  );
};

export default EmojiMemberListBottomSheet;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  margin: 1.44rem 1.25rem 1.25rem 1.25rem;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Emoji = styled.button<{ isClicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.125rem;
  height: 3.125rem;

  border-radius: 50%;
  background-color: ${({ theme, isClicked }) =>
    isClicked ? theme.colors.blue100 : theme.colors.neutral0};
  border: ${({ theme, isClicked }) =>
    isClicked
      ? `0.05rem solid ${theme.colors.blue500}`
      : `0.05rem solid transparent`};
  font-size: 1.5rem;
`;

// Emoji Member List

const MemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 16rem;
  padding: ${({ theme }) => theme.padding['8']};
  gap: ${({ theme }) => theme.gap['4']};

  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: ${({ theme }) => theme.rounded['12']};
`;
const MemberItemWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.gap['8']};
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;
