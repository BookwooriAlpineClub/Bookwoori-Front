import { useEffect, useCallback } from 'react';
import { connectHandler, disconnectHandler } from '@src/apis/chat';
import type { DM } from '@src/types/messageRoom';
import type { ChatEventRes } from '@src/types/apis/chat';
import { MessageRoomRes } from '@src/types/apis/messageRoom';

interface UseChatHandlerProps {
  roomInfo: MessageRoomRes | undefined;
  setNewMessages: React.Dispatch<React.SetStateAction<DM[]>>;
  setMessages?: React.Dispatch<React.SetStateAction<DM[]>>;
}

const useChatHandler = ({
  roomInfo,
  setNewMessages,
  setMessages,
}: UseChatHandlerProps) => {
  const onMessage = useCallback(
    (message: ChatEventRes) => {
      if (message.messageRoomId !== roomInfo!.messageRoomId) return;

      if (message.eventType === 'REACT') {
        setNewMessages((prevMessages) =>
          prevMessages.map((msg) => {
            if (msg.id === message.payload.id) {
              const prevReactions = msg.reactions || {};
              let updatedReactions;
              if (message.payload.emojiCount > 0) {
                updatedReactions = {
                  ...prevReactions,
                  [message.payload.emoji]: {
                    count: message.payload.emojiCount,
                    members: message.payload.members,
                  },
                };
              } else {
                // count가 0이면 해당 이모지 반응 키를 제거
                const { [message.payload.emoji]: _removed, ...restReactions } =
                  prevReactions;
                updatedReactions = restReactions;
              }
              return { ...msg, reactions: updatedReactions };
            }
            return msg;
          }),
        );

        if (setMessages) {
          setMessages((prevMessages) =>
            prevMessages.map((msg) => {
              if (msg.id === message.payload.id) {
                const prevReactions = msg.reactions || {};
                let updatedReactions;
                if (message.payload.emojiCount > 0) {
                  updatedReactions = {
                    ...prevReactions,
                    [message.payload.emoji]: {
                      count: message.payload.emojiCount,
                      members: message.payload.members,
                    },
                  };
                } else {
                  const {
                    [message.payload.emoji]: _removed,
                    ...restReactions
                  } = prevReactions;
                  updatedReactions = restReactions;
                }
                return { ...msg, reactions: updatedReactions };
              }
              return msg;
            }),
          );
        }
      }

      if (message.eventType === 'MODIFY') {
        setNewMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === message.payload.id
              ? { ...msg, content: message.payload.content }
              : msg,
          ),
        );

        if (!setMessages) return;

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === message.payload.id
              ? { ...msg, content: message.payload.content }
              : msg,
          ),
        );
      }

      if (message.eventType === 'DELETE') {
        setNewMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== message.payload),
        );

        if (!setMessages) return;

        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== message.payload),
        );
      }

      if (
        (message.eventType === 'NEW_MESSAGE' ||
          message.eventType === 'REPLY') &&
        'messageRoomId' in message.payload
      ) {
        const newMessage: DM = {
          parentMemberId: message.payload.parentMemberId,
          parentId: message.payload.parentId,
          parentContent: message.payload.parentContent,
          id: message.payload.id,
          messageRoomId: message.payload.messageRoomId,
          memberId: message.payload.memberId,
          content: message.payload.content,
          createdAt: message.payload.createdAt,
        };

        setNewMessages((prev) => [newMessage, ...prev]);
      }
    },
    [roomInfo, setNewMessages, setMessages],
  );

  useEffect(() => {
    if (!roomInfo) return;

    // WebSocket 연결
    connectHandler(onMessage, `/topic/direct/${roomInfo.messageRoomId}`);

    return () => {
      // 컴포넌트 언마운트 시 WebSocket 연결 해제
      disconnectHandler();
    };
  }, [roomInfo, onMessage]);

  return { onMessage };
};

export default useChatHandler;
