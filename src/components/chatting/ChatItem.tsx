import styled from 'styled-components';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  bottomsheetState,
  editChatIdState,
  replyChatIdState,
  replyChatState,
} from '@src/states/atoms';
import useLongPress from '@src/hooks/useLongPress';
import useModal from '@src/hooks/useModal';
import useToast from '@src/hooks/useToast';
import { editHandler } from '@src/apis/chat';
import type { DM } from '@src/types/messageRoom';
import type { ChannelMessage } from '@src/types/channel';
import { formatChatItemTime } from '@src/utils/formatters';
import { handleImgError } from '@src/utils/helpers';
import ChatMenu from '@src/components/common/emoji/ChattingBottomsheet';
import Profile from '@src/assets/images/userSettings/background_default.svg';
import { ReactComponent as Response } from '@src/assets/icons/response.svg';
import { ReactComponent as ReplyLine } from '@src/assets/images/chat/reply_line.svg';
import EmojiList from '@src/components/chatting/EmojiList';

interface ChatItemProps {
  chatItem: DM | ChannelMessage;
  nickname: string;
  createdAt: string;
  imgUrl?: string;
}

const MIN_HEIGHT = 32;

const ChatItem = forwardRef<HTMLDivElement, ChatItemProps>(
  ({ chatItem, imgUrl, nickname, createdAt }: ChatItemProps, ref) => {
    const [editChatId, setEditChatId] = useRecoilState(editChatIdState);
    const [replyChatId, setReplyChatId] = useRecoilState(replyChatIdState);
    const setReplyChat = useSetRecoilState(replyChatState);
    const [editContent, setEditContent] = useState(chatItem.content);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const { openModal: openBottomsheet, closeModal: closeBottomsheet } =
      useModal(bottomsheetState);
    const addToast = useToast();
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
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    // 메시지 수정 textarea focus, 높이 조절
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const { length } = editContent;
        inputRef.current.setSelectionRange(length, length);
        adjustHeight();
      }
    }, [editChatId, editContent]);

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

    // 메시지 수정 요청
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

    // 메시지 수정 키조작 함수
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

    // 답장 보낼 부모 메시지 저장
    const handleReply = () => {
      setReplyChat({
        ...chatItem,
        nickname,
      });
    };

    // 답장 부모 메시지 이동 시 배경색 변화
    useEffect(() => {
      if (replyChatId === chatItem.id) {
        setIsSelected(true);

        setTimeout(() => {
          setIsSelected(false);
          setReplyChatId(undefined);
        }, 1500);
      }
    }, [replyChatId, chatItem.id]);

    return (
      <WithReplayLayout ref={ref} $selected={isSelected}>
        {chatItem.parentId && (
          <ReplyContainer>
            <LineWrapper>
              <ReplyLine width={30} height={20} />
            </LineWrapper>
            <ReplySpan onClick={() => setReplyChatId(chatItem.parentId)}>
              {chatItem.parentContent}
            </ReplySpan>
          </ReplyContainer>
        )}
        <Layout {...longPressHandler}>
          <Img
            src={imgUrl ?? Profile}
            onError={(e) => handleImgError(e, Profile)}
          />
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
              <>
                <Text>{chatItem.content}</Text>
                {chatItem.reactions &&
                  Object.keys(chatItem.reactions).length > 0 && (
                    <EmojiList
                      reactions={chatItem.reactions}
                      id={chatItem.id}
                    />
                  )}
              </>
            )}
          </Container>
          <ReplyMenu onClick={handleReply}>
            <Response width={25} height={25} />
          </ReplyMenu>
        </Layout>
      </WithReplayLayout>
    );
  },
);

ChatItem.displayName = 'ChatItem';

export default ChatItem;

const WithReplayLayout = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[4]};

  width: 100%;
  padding: 0.9375rem 1.25rem;

  background-color: ${({ theme, $selected }) =>
    $selected && theme.colors.blue100};
  opacity: ${({ $selected }) => $selected && 0.7};
`;
const ReplyContainer = styled.div`
  display: flex;
  align-items: end;

  width: 100%;
  margin-left: 1.25rem;
`;
const LineWrapper = styled.div`
  margin-bottom: -0.6875rem;
`;
const ReplySpan = styled.span`
  padding: ${({ theme }) => theme.padding[4]} ${({ theme }) => theme.padding[8]};
  border-radius: ${({ theme }) => theme.rounded[8]};

  background-color: ${({ theme }) => theme.colors.blue100};

  ${({ theme }) => theme.fonts.body}
  font-size: 0.75rem;
  cursor: pointer;
`;
const Layout = styled.div`
  display: flex;
  position: relative;
  gap: ${({ theme }) => theme.gap[12]};

  width: 100%;

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
  right: 0;

  transform: translateY(-50%);
  opacity: 0;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
`;
