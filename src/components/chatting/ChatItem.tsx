import styled from 'styled-components';
import useBottomsheet from '@src/hooks/useBottomsheet';
import useLongPress from '@src/hooks/useLongPress';
import ChatMenu from './ChatMenu';

interface Chatting {
  imgUrl?: string;
  nickname: string;
  time: string;
  text: string;
}

const ChatItem = ({ imgUrl, nickname, time, text }: Chatting) => {
  const { openBottomsheet } = useBottomsheet();
  const longPressHandler = useLongPress({
    onLongPress: () => openBottomsheet(<ChatMenu />),
  });

  return (
    <SLayout {...longPressHandler}>
      <SImg src={imgUrl} />
      <SContainer>
        <SWrapper>
          <SNickname>{nickname}</SNickname>
          <STime>{time}</STime>
        </SWrapper>
        <SText>{text}</SText>
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
  width: 40px;
  height: 40px;

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
  gap: 5px;
`;
const SNickname = styled.label`
  line-height: 20px;
`;
const STime = styled.label`
  ${({ theme }) => theme.fonts.caption};
  color: var(--400, #9496a1);
`;
const SText = styled.p`
  ${({ theme }) => theme.colors.black100};
  line-height: 20px;
  font-weight: 600;
`;
