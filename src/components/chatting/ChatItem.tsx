import styled from 'styled-components';
import { SyntheticEvent, useMemo } from 'react';
import useBottomsheet from '@src/hooks/useBottomsheet';
import useLongPress from '@src/hooks/useLongPress';
import type { DM } from '@src/types/messageRoom';
import type { ChannelMessage } from '@src/types/channel';
import { formatChatItemTime } from '@src/utils/formatters';
import ChatMenu from '@src/components/common/EmojiBottomsheet';
import Profile from '@src/assets/images/userSettings/background_default.svg';

interface ChatItemProps {
  chatItem: DM | ChannelMessage;
  nickname: string;
  createdAt: string;
  imgUrl?: string;
}

const ChatItem = ({ chatItem, imgUrl, nickname, createdAt }: ChatItemProps) => {
  const { openBottomsheet } = useBottomsheet();
  const longPressHandler = useLongPress({
    onLongPress: () => openBottomsheet(<ChatMenu content={chatItem.content} />),
  });

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = Profile;
  };

  return (
    <Layout {...longPressHandler}>
      <Img src={imgUrl ?? Profile} onError={handleImgError} />
      <Container>
        <Wrapper>
          <Nickname>{nickname}</Nickname>
          <Time>
            {useMemo(
              () => createdAt && formatChatItemTime(createdAt),
              [createdAt],
            )}
          </Time>
        </Wrapper>
        <Text>{chatItem.content}</Text>
        {/* {chatItem.emoji && (
          <SEmoji
            type='button'
            onClick={() => openBottomsheet(<ChatMenu emoji={chatItem.emoji} />)}
          >
            {chatItem.emoji}
          </SEmoji>
        )} */}
      </Container>
    </Layout>
  );
};

export default ChatItem;

const Layout = styled.div`
  display: flex;
  gap: 0.75rem;

  padding: 0.9375rem 1.25rem;
`;
const Img = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue100};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[4]};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gap[6]};
`;
const Nickname = styled.label`
  line-height: 1.25rem;
`;
const Time = styled.label`
  ${({ theme }) => theme.fonts.caption};
  color: var(--400, #9496a1);
`;
const Text = styled.p`
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
