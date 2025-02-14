import type { DM } from '@src/types/messageRoom';
import type { ChannelMessage } from '@src/types/channel';
import { SyntheticEvent, useMemo } from 'react';
import useLongPress from '@src/hooks/useLongPress';
import useModal from '@src/hooks/useModal';
import { useGetProfile } from '@src/hooks/query/member';
import { bottomsheetState } from '@src/states/atoms';
import { formatChatItemTime } from '@src/utils/formatters';
import styled from 'styled-components';
import ChatMenu from '@src/components/common/emoji/ChattingBottomsheet';
import Profile from '@src/assets/images/userSettings/background_default.svg';

interface ChatItemProps {
  chatItem: DM | ChannelMessage;
  createdAt: string;
  memberId: number;
}

const ChannelChatItem = ({ chatItem, memberId, createdAt }: ChatItemProps) => {
  // long press bottomsheet
  const { openModal: openBottomsheet } = useModal(bottomsheetState);
  const longPressHandler = useLongPress({
    onLongPress: () =>
      openBottomsheet(<ChatMenu id={chatItem.id} content={chatItem.content} />),
  });

  // user data (nickname, profileImg)
  const { profileData: user } = useGetProfile(memberId);
  // img error handler
  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = Profile;
  };

  return (
    <SLayout {...longPressHandler}>
      {user?.profileImg ? (
        <SImg src={user.profileImg} onError={handleImgError} />
      ) : (
        <SImg src={Profile} />
      )}
      <SContainer>
        <SWrapper>
          <SNickname>{user?.nickname}</SNickname>
          <STime>
            {useMemo(
              () => createdAt && formatChatItemTime(createdAt),
              [createdAt],
            )}
          </STime>
        </SWrapper>
        <SText>{chatItem.content}</SText>
        {/* {chatItem.emoji && (
          <SEmoji
            type='button'
            onClick={() => openBottomsheet(<ChatMenu emoji={chatItem.emoji} />)}
          >
            {chatItem.emoji}
          </SEmoji>
        )} */}
      </SContainer>
    </SLayout>
  );
};

export default ChannelChatItem;

const SLayout = styled.div`
  display: flex;
  gap: 0.75rem;

  padding: 0.9375rem 1.25rem;
`;
const SImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue100};
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const SWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;
const SNickname = styled.label`
  line-height: 1.25rem;
`;
const STime = styled.label`
  ${({ theme }) => theme.fonts.caption};
  color: var(--400, #9496a1);
`;
const SText = styled.p`
  ${({ theme }) => theme.colors.neutral950};
  line-height: 1.25rem;
  font-weight: 600;

  cursor: default;
`;
// const SEmoji = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   width: min-content;
//   min-width: 1.875rem;
//   height: 1.4375rem;

//   border-radius: 1.875rem;
//   background-color: ${({ theme }) => theme.colors.blue100};
// `;
