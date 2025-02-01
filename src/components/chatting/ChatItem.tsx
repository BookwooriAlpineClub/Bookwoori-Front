import styled from 'styled-components';
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  bottomsheetState,
  editChatIdState,
  replyChatState,
} from '@src/states/atoms';
import useLongPress from '@src/hooks/useLongPress';
import useModal from '@src/hooks/useModal';
import useToast from '@src/hooks/useToast';
import { editHandler } from '@src/apis/chat';
import type { DM } from '@src/types/messageRoom';
import type { ChannelMessage } from '@src/types/channel';
import { formatChatItemTime } from '@src/utils/formatters';
import ChatMenu from '@src/components/common/EmojiBottomsheet';
import Profile from '@src/assets/images/userSettings/background_default.svg';
import { ReactComponent as Response } from '@src/assets/icons/response.svg';

interface ChatItemProps {
  chatItem: DM | ChannelMessage;
  nickname: string;
  createdAt: string;
  imgUrl?: string;
}

const MIN_HEIGHT = 32;

const ChatItem = ({ chatItem, imgUrl, nickname, createdAt }: ChatItemProps) => {
  const [editChatId, setEditChatId] = useRecoilState(editChatIdState);
  const setReplyChat = useSetRecoilState(replyChatState);
  const [editContent, setEditContent] = useState(chatItem.content);
  const { openModal: openBottomsheet, closeModal: closeBottomsheet } =
    useModal(bottomsheetState);
  const longPressHandler = useLongPress({
    onLongPress: () =>
      openBottomsheet(
        <ChatMenu
          id={chatItem.id}
          content={chatItem.content}
          closeBottomsheet={closeBottomsheet}
        />,
      ),
  });
  const addToast = useToast();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const { length } = editContent;
      inputRef.current.setSelectionRange(length, length);
      adjustHeight();
    }
  }, [editChatId, editContent]);

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = Profile;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEditMessage();
    }
    if (e.key === 'Escape') {
      setEditContent(chatItem.content);
      setEditChatId(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = `${MIN_HEIGHT}px`;

      if (inputRef.current.scrollHeight > MIN_HEIGHT) {
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    }
  };

  const handleEditMessage = async () => {
    if (editContent.length === 0) {
      addToast('error', '수정할 내용을 입력해주세요.');
      return;
    }

    try {
      await editHandler(
        { id: chatItem.id, content: editContent },
        '/pub/direct/modify',
      );
      console.log('Message edited successfully');
      setEditChatId(null);
    } catch (error) {
      console.error('Failed to edit message:', error);
    }
  };

  const handleReply = () => {
    setReplyChat({
      ...chatItem,
      nickname,
    });
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
        {editChatId === chatItem.id ? (
          <Form>
            <Textarea
              ref={inputRef}
              value={editContent}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <Span>ESC 키로 취소 • Enter 키로 저장</Span>
          </Form>
        ) : (
          <Text>{chatItem.content}</Text>
        )}
      </Container>
      <ReplyMenu onClick={handleReply}>
        <Response width={25} height={25} />
      </ReplyMenu>
    </Layout>
  );
};

export default ChatItem;

const Layout = styled.div`
  display: flex;
  position: relative;
  gap: ${({ theme }) => theme.gap[12]};

  width: 100%;
  padding: 0.9375rem 1.25rem;

  &:hover > button {
    opacity: 1;
    transform: translateY(0);
  }
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
  width: 100%;
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
  color: ${({ theme }) => theme.colors.neutral600};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.gap[2]};
`;
const Textarea = styled.textarea`
  width: 100%;
  min-height: 2rem;

  padding: ${({ theme }) => theme.padding[8]};
  border-radius: ${({ theme }) => theme.rounded[8]};

  background-color: ${({ theme }) => theme.colors.neutral200};

  ${({ theme }) => theme.fonts.body};
  ${({ theme }) => theme.colors.neutral950};

  resize: none;
  overflow-y: hidden;
`;
const Span = styled.span`
  ${({ theme }) => theme.fonts.caption};
  margin-left: 0.1875rem;
`;
const Text = styled.p`
  ${({ theme }) => theme.colors.neutral950};
  line-height: 1.25rem;
  font-weight: 600;

  cursor: default;
`;
const ReplyMenu = styled.button`
  display: flex;
  position: absolute;
  top: 30%;
  right: 25px;

  transform: translateY(-50%);
  opacity: 0;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
`;
