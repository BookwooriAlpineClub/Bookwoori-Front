import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { replyChatState } from '@src/states/atoms';
import useLoaderData from '@src/hooks/useRoaderData';
import { usePostMessageRoom } from '@src/hooks/query/chat';
import useToast from '@src/hooks/useToast';
import { sendHandler } from '@src/apis/chat';
import type { MessageReq, ReplyReq } from '@src/types/apis/chat';
import { adjustHeight } from '@src/utils/helpers';
import { ReactComponent as Send } from '@src/assets/icons/ck_arrow_up.svg';
import { ReactComponent as SendGreen } from '@src/assets/icons/ck_arrow_right.svg';
import { ReactComponent as Delete } from '@src/assets/icons/multiply.svg';

const MIN_HEIGHT = 41;

const ChatBar = ({ nickname }: { nickname: string }) => {
  const { id: memberId } = useLoaderData<{ id: number }>();
  const { roomInfo } = usePostMessageRoom(memberId);
  const [replyChatItem, setReplyChatItem] = useRecoilState(replyChatState);
  const [chat, setChat] = useState<string>('');
  const [paddingHeight, setPaddingHeight] = useState<number | null>(null);
  const addToast = useToast();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const replyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    adjustHeight(inputRef, MIN_HEIGHT);
  }, [chat]);

  // 답장 보낼 때 채팅바 포커싱, 높이 조절
  useEffect(() => {
    if (inputRef.current && replyChatItem) {
      inputRef.current.focus();
      const { length } = chat;
      inputRef.current.setSelectionRange(length, length);
      adjustHeight(inputRef, MIN_HEIGHT);
    }
  }, [replyChatItem, chat]);

  const updatePaddingHeight = () => {
    const inputHeight = inputRef.current?.scrollHeight ?? 0;
    const replyHeight = replyRef.current?.offsetHeight ?? 0;

    const totalHeight = inputHeight + replyHeight;
    setPaddingHeight(totalHeight > MIN_HEIGHT ? totalHeight : null);
  };

  useEffect(() => {
    updatePaddingHeight();
  }, [replyChatItem, chat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChat(e.target.value);
    adjustHeight(inputRef, MIN_HEIGHT);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (replyChatItem) {
        handleSendReply();
        return;
      }

      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!chat.trim()) return;
    if (chat.length > 2000) {
      addToast('info', '최대 2000자까지 전송가능합니다.');
      setChat(chat.slice(0, 2000));
      return;
    }

    const message: MessageReq = {
      messageRoomId: roomInfo?.messageRoomId,
      type: 'text',
      content: chat,
    };

    try {
      await sendHandler(message, '/pub/direct/send');
      console.log('Message sent successfully');
      setChat('');
    } catch (error) {
      console.error('Failed to send message:', error);
      addToast('error', '전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSendReply = async () => {
    if (!chat.trim()) return;
    if (!replyChatItem?.id) return;
    if (chat.length > 2000) {
      addToast('info', '최대 2000자까지 전송가능합니다.');
      setChat(chat.slice(0, 2000));
      return;
    }

    const message: ReplyReq = {
      parentId: replyChatItem.id,
      messageRoomId: roomInfo?.messageRoomId,
      type: 'text',
      content: chat,
    };

    try {
      await sendHandler(message, '/pub/direct/reply');
      console.log('Reply sent successfully');
      setChat('');
      setReplyChatItem(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      addToast('error', '전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Padding $height={paddingHeight} />
      <Layout>
        {replyChatItem && (
          <ReplyLayout ref={replyRef}>
            <ReplyContainer>
              <ReplyWrapper>
                <Span>{replyChatItem.nickname}에게 답장</Span>
                <ReplyContent>{replyChatItem.content}</ReplyContent>
              </ReplyWrapper>
              <Button type='button' onClick={() => setReplyChatItem(null)}>
                <Delete width={25} height={25} />
              </Button>
            </ReplyContainer>
            <Line />
          </ReplyLayout>
        )}
        <Container>
          <Textarea
            ref={inputRef}
            value={chat}
            onChange={handleInputChange}
            onInput={updatePaddingHeight}
            placeholder={
              replyChatItem ? '답장 보내기' : `${nickname}에게 문자 보내기`
            }
            onKeyDown={handleKeyDown}
          />
          <Button
            type='button'
            onClick={replyChatItem ? handleSendReply : handleSendMessage}
          >
            {chat ? <SendGreen /> : <Send />}
          </Button>
        </Container>
      </Layout>
    </>
  );
};

export default ChatBar;

const Padding = styled.div<{ $height: number | null }>`
  width: 100%;
  height: ${({ $height }) => ($height ? `${$height - 40}px` : '0')};
`;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.header};

  width: 100%;

  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const ReplyLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ReplyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  padding: ${({ theme }) => `${theme.padding[8]} ${theme.padding[24]}`};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[2]};
`;
const Span = styled.span`
  color: ${({ theme }) => theme.colors.blue700};
`;
const ReplyContent = styled.p`
  color: ${({ theme }) => theme.colors.neutral950};
  white-space: pre-wrap;
`;
const Line = styled.line`
  height: 0.0625rem;
  width: 95%;

  background-color: ${({ theme }) => theme.colors.neutral200};
`;
const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap[10]};
  padding: ${({ theme }) => theme.padding[16]};
`;
const Textarea = styled.textarea`
  padding: 0.625rem;
  width: 100%;
  max-height: 9.375rem;

  border-radius: 1.875rem;

  ${({ theme }) => theme.fonts.body};
  background-color: ${({ theme }) => theme.colors.neutral50};

  resize: none;
  overflow-y: scroll;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
