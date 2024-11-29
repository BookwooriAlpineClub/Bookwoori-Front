import styled from 'styled-components';
import useBottomsheet from '@src/hooks/useBottomsheet';
import useLongPress from '@src/hooks/useLongPress';
import ChatMenu from '@src/components/chatting/ChatMenu';
import Profile from '@src/assets/images/userSettings/background_default.svg';

interface Chatting {
  imgUrl?: string;
  emoji?: string;
  nickname: string;
  time: string;
  text: string;
}

const ChatItem = ({ chatItem }: { chatItem: Chatting }) => {
  const { openBottomsheet } = useBottomsheet();
  const longPressHandler = useLongPress({
    onLongPress: () => openBottomsheet(<ChatMenu emoji={chatItem.emoji} />),
  });

  return (
    <SLayout {...longPressHandler}>
      {chatItem.imgUrl ? <SImg src={chatItem.imgUrl} /> : <SImg src={Profile} />}
      <SContainer>
        <SWrapper>
          <SNickname>{chatItem.nickname}</SNickname>
          <STime>{chatItem.time}</STime>
        </SWrapper>
        <SText>{chatItem.text}</SText>
        {chatItem.emoji && (
          <SEmoji
            type='button'
            onClick={() => openBottomsheet(<ChatMenu emoji={chatItem.emoji} />)}
          >
            {chatItem.emoji}
          </SEmoji>
        )}
      </SContainer>
    </SLayout>
  );
};

export default ChatItem;

const SLayout = styled.div`
  display: flex;
  gap: 0.75rem;

  padding: 0.9375rem 1.25rem;
`;
const SImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue300};
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
  ${({ theme }) => theme.colors.black100};
  line-height: 1.25rem;
  font-weight: 600;

  cursor: default;
`;
const SEmoji = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: min-content;
  min-width: 1.875rem;
  height: 1.4375rem;

  border-radius: 1.875rem;
  background-color: ${({ theme }) => theme.colors.blue300};
`;
